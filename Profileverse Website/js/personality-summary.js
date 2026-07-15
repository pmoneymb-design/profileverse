"use strict";

const PROFILEVERSE_SUMMARIES = {
    Analyst: {
        summary:
            "You are an Analyst who prefers understanding before action. You naturally look for patterns, evidence, and long-term consequences, while your strongest decisions usually come from preparation rather than impulse.",
        leadership: ["Strategic Guide", "You lead by clarifying the problem, improving the plan, and helping others understand what matters most."],
        communication: ["Precise and Thoughtful", "You prefer clear reasoning and meaningful information over unnecessary conversation."],
        decision: ["Evidence First", "You compare options, identify risk, and commit once the logic is strong enough."],
        learning: ["Deep Understanding", "You learn best when you can study foundations, connect ideas, and understand why something works."],
        teamwork: ["Specialist and Planner", "You strengthen groups by spotting weak points and bringing structure to complex tasks."],
        stress: ["Analyze and Rebuild", "Under pressure, you regain control by understanding what changed and creating a new plan."]
    },

    Explorer: {
        summary:
            "You are an Explorer driven by discovery, flexibility, and possibility. You are most energized when the path is open and you can learn by entering unfamiliar situations.",
        leadership: ["Opportunity Scout", "You lead by finding alternatives, testing new directions, and keeping the group open to possibility."],
        communication: ["Open and Curious", "You connect by asking questions, sharing discoveries, and adapting to the people around you."],
        decision: ["Flexible Commitment", "You are willing to choose before every detail is known and adjust when new information appears."],
        learning: ["Experience First", "You learn best through direct involvement, experimentation, and freedom to change methods."],
        teamwork: ["Creative Pathfinder", "You help teams escape rigid thinking and discover routes others might overlook."],
        stress: ["Change the Route", "Under pressure, you improvise and search for a path that fits the new reality."]
    },

    Builder: {
        summary:
            "You are a Builder who turns structure, discipline, and repeated effort into dependable results. You are strongest when a goal needs a system that can survive over time.",
        leadership: ["Operational Leader", "You lead by organizing responsibilities, protecting standards, and making sure the work gets finished."],
        communication: ["Direct and Practical", "You prefer useful information, clear expectations, and conversations tied to action."],
        decision: ["Plan and Execute", "You evaluate what is realistic, create structure, and move forward consistently."],
        learning: ["Mastery Through Practice", "You learn best through repetition, systems, and steady improvement."],
        teamwork: ["Reliable Anchor", "Groups rely on you to maintain quality and follow through on commitments."],
        stress: ["Restore Order", "Under pressure, you create routines, identify priorities, and rebuild stability."]
    },

    Diplomat: {
        summary:
            "You are a Diplomat whose personality centers on empathy, cooperation, and communication. You naturally notice emotional context and help people move forward without losing trust.",
        leadership: ["Relationship Leader", "You lead by listening, including overlooked voices, and creating cooperation."],
        communication: ["Warm and Responsive", "You pay attention to tone, emotion, and what people may be struggling to say."],
        decision: ["People-Aware Choices", "You consider how outcomes affect relationships and look for solutions others can support."],
        learning: ["Collaborative Learning", "You learn best through discussion, examples, and supportive feedback."],
        teamwork: ["Connection Builder", "You keep groups from becoming divided and help people understand one another."],
        stress: ["Reduce the Temperature", "Under pressure, you listen carefully and try to restore trust before acting."]
    },

    Guardian: {
        summary:
            "You are a Guardian who protects people, commitments, and stability through loyalty and steady action. Others often trust you when a situation becomes difficult.",
        leadership: ["Protective Leader", "You lead by taking responsibility, defending the group, and remaining dependable."],
        communication: ["Steady and Reassuring", "You communicate in ways that create safety, consistency, and trust."],
        decision: ["Duty and Stability", "You prioritize protection, reliability, and what must be preserved."],
        learning: ["Practice with Purpose", "You learn best when the skill has a clear use and can be strengthened over time."],
        teamwork: ["Steady Protector", "You become the person who holds the group together during uncertainty."],
        stress: ["Hold the Line", "Under pressure, you rely on loyalty, routine, and endurance."]
    },

    Visionary: {
        summary:
            "You are a Visionary who sees possibilities beyond the present. Your personality combines creativity, ambition, and the ability to make larger goals feel meaningful.",
        leadership: ["Direction Setter", "You lead by describing what could be possible and helping others believe the effort matters."],
        communication: ["Big-Picture Storyteller", "You communicate through ideas, purpose, and future possibilities."],
        decision: ["Future Impact", "You choose based on long-term potential and the scale of what could be created."],
        learning: ["Conceptual Discovery", "You learn best when ideas connect to a larger vision or meaningful future."],
        teamwork: ["Purpose Builder", "You help groups understand why the work matters and where it can lead."],
        stress: ["Return to Purpose", "Under pressure, you regain energy by reconnecting the struggle to a larger goal."]
    },

    Maverick: {
        summary:
            "You are a Maverick who values independence, originality, and personal judgment. You are comfortable questioning assumptions and choosing a path without waiting for approval.",
        leadership: ["Independent Challenger", "You lead by exposing weak assumptions and proving that another path is possible."],
        communication: ["Direct and Unfiltered", "You prefer honesty and clarity over saying what others expect."],
        decision: ["Trust Your Judgment", "You rely on your own reasoning and remain willing to reject conventional choices."],
        learning: ["Self-Directed Learning", "You learn best when you control the method and can challenge the material."],
        teamwork: ["Constructive Disruptor", "You improve groups by questioning habits that no longer make sense."],
        stress: ["Create Your Own Route", "Under pressure, you resist confinement and look outside the expected options."]
    },

    Catalyst: {
        summary:
            "You are a Catalyst who creates movement, urgency, and visible momentum. Your personality combines leadership, confidence, communication, and action.",
        leadership: ["Momentum Leader", "You lead from the front and help people move from hesitation to action."],
        communication: ["Energetic and Persuasive", "You communicate with confidence and make action feel possible."],
        decision: ["Act and Adjust", "You prefer movement over delay and refine the plan once progress begins."],
        learning: ["Challenge-Based Learning", "You learn best when there is a goal, visible progress, and something meaningful at stake."],
        teamwork: ["Energy Source", "You raise urgency, confidence, and momentum across the group."],
        stress: ["Mobilize Action", "Under pressure, you communicate quickly, assign direction, and create movement."]
    }
};

window.ProfileversePersonalitySummary = {
    get(archetype) {
        return PROFILEVERSE_SUMMARIES[archetype] || PROFILEVERSE_SUMMARIES.Analyst;
    }
};
