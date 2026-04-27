#!/usr/bin/env python3
"""
Job Search Agent Team
Usage:
  python main.py                    # interactive menu
  python main.py --agent all        # run all 3 agents in sequence
  python main.py --agent positioning
  python main.py --agent demand
  python main.py --agent interview
"""

import argparse
import os
import sys
from pathlib import Path

BASE_DIR = Path(__file__).parent
OUTPUTS_DIR = BASE_DIR / "outputs"


def check_api_key() -> None:
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("Error: ANTHROPIC_API_KEY is not set.")
        print("Run: export ANTHROPIC_API_KEY=sk-ant-...")
        sys.exit(1)


def show_outputs_summary() -> None:
    output_files = sorted(OUTPUTS_DIR.glob("*.md"))
    if not output_files:
        return
    print("\n--- Outputs in outputs/ ---")
    for f in output_files:
        size_kb = f.stat().st_size / 1024
        print(f"  {f.name:<40} ({size_kb:.1f} KB)")


def run_positioning() -> None:
    from agents.market_positioning import run
    run()


def run_demand() -> None:
    from agents.demand_generation import run
    run()


def run_interview() -> None:
    from agents.interview_conversion import run
    run()


def run_all() -> None:
    print("Running full pipeline: Positioning → Demand → Interview\n")
    run_positioning()
    run_demand()
    run_interview()
    print("\n=== All agents complete ===")
    show_outputs_summary()


def interactive_menu() -> None:
    print("\n╔══════════════════════════════════╗")
    print("║      Job Search Agent Team       ║")
    print("╚══════════════════════════════════╝")
    print()
    print("  1. Market Positioning Agent")
    print("     → Resume, LinkedIn, keyword map, narrative")
    print()
    print("  2. Demand Generation Agent")
    print("     → Content calendar, posts, outreach scripts")
    print("     (requires Agent 1 outputs)")
    print()
    print("  3. Interview & Conversion Agent")
    print("     → Story bank, interview prep, negotiation")
    print("     (requires Agent 1 outputs)")
    print()
    print("  4. Run All Agents (1 → 2 → 3)")
    print()
    print("  5. Show output files")
    print()
    print("  6. Exit")
    print()

    choice = input("Select (1-6): ").strip()

    if choice == "1":
        run_positioning()
        show_outputs_summary()
    elif choice == "2":
        run_demand()
        show_outputs_summary()
    elif choice == "3":
        run_interview()
        show_outputs_summary()
    elif choice == "4":
        run_all()
    elif choice == "5":
        show_outputs_summary()
    elif choice == "6":
        sys.exit(0)
    else:
        print("Invalid selection.")
        sys.exit(1)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Job Search Agent Team — powered by Claude",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python main.py                     interactive menu
  python main.py --agent all         run full pipeline
  python main.py --agent positioning agent 1 only
  python main.py --agent demand      agent 2 only (needs agent 1 outputs)
  python main.py --agent interview   agent 3 only (needs agent 1 outputs)
        """,
    )
    parser.add_argument(
        "--agent",
        choices=["all", "positioning", "demand", "interview"],
        help="Which agent to run",
    )
    args = parser.parse_args()

    check_api_key()

    try:
        if args.agent == "all":
            run_all()
        elif args.agent == "positioning":
            run_positioning()
            show_outputs_summary()
        elif args.agent == "demand":
            run_demand()
            show_outputs_summary()
        elif args.agent == "interview":
            run_interview()
            show_outputs_summary()
        else:
            interactive_menu()
    except FileNotFoundError as e:
        print(f"\nError: {e}")
        sys.exit(1)
    except ValueError as e:
        print(f"\nError: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\nInterrupted.")
        sys.exit(0)


if __name__ == "__main__":
    main()
