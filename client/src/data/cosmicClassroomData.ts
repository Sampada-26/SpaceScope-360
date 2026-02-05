export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correct: number;
    fact: string;
}

export interface TrainingSector {
    t: string; // Title
    d: string; // Description
    s: "Active" | "Locked"; // Status
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 1,
        question: "Which planet is known as the 'Red Planet' due to iron oxide?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1,
        fact: "Mars has the largest volcano in the solar system, Olympus Mons!"
    },
    {
        id: 2,
        question: "What is the 'Goldilocks Zone' in space science?",
        options: ["A zone of gold asteroids", "Center of a black hole", "The habitable range around a star", "The edge of the galaxy"],
        correct: 2,
        fact: "It's the range where liquid water can exist on a planet's surface."
    },
    {
        id: 3,
        question: "What does 'ISS' stand for?",
        options: ["Interstellar Space Station", "International Space Station", "Internal Solar System", "Integrated Space Satellite"],
        correct: 1,
        fact: "The ISS circles Earth every 90 minutes at 17,500 mph."
    },
    {
        id: 4,
        question: "Which telescope was launched in 2021 to see the first stars?",
        options: ["Hubble", "James Webb (JWST)", "Kepler", "Spitzer"],
        correct: 1,
        fact: "JWST can see back over 13.5 billion years to the dawn of the universe."
    }
];

export const TRAINING_SECTORS: TrainingSector[] = [
    { t: "Orbital Mechanics", d: "Gravity assists & Newton's laws.", s: "Active" },
    { t: "Rocketry Systems", d: "Propulsion chemistry & stages.", s: "Locked" },
    { t: "Deep Space Habitats", d: "Life support & radiation shielding.", s: "Locked" },
    { t: "Exoplanet Bio", d: "Searching for alien signatures.", s: "Locked" },
];
