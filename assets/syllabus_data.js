// src/assets/syllabus_data.js
const syllabusData = {
    "BCA": {
        // semesters -
        "1": [
            // subjects
            { 
                title: "Mathematics Foundation to Computer Science - I", 
                credits: 3, 
                units: [
                    {
                        name: "UNIT I: Set, Relation and Function",
                        topics: [
                            { name: "Set Theory & Operations", vid: "https://www.youtube.com/results?search_query=Discrete+Math+Set+Theory+Operations+Venn+Diagrams" },
                            { name: "Relations & Warshall's Algorithm", vid: "https://www.youtube.com/results?search_query=Discrete+Math+Relations+Equivalence+Warshall+Algorithm" },
                            { name: "Functions (Injective, Bijective, Inverse)", vid: "https://www.youtube.com/results?search_query=Discrete+Math+Functions+Injective+Surjective+Bijective" },
                            { name: "Special CS Functions (Ceiling, Floor, Log)", vid: "https://www.youtube.com/results?search_query=Ceiling+and+Floor+Functions+Discrete+Mathematics" }
                        ],
                        pdf: "" 
                    },
                    {
                        name: "UNIT II: Counting and Recurrence Relation",
                        topics: [
                            { name: "Combinatorics & Pigeonhole Principle", vid: "https://www.youtube.com/results?search_query=Pigeonhole+Principle+Permutations+Combinations+Binomial+Theorem" },
                            { name: "Recurrence Relations & Tower of Hanoi", vid: "https://www.youtube.com/results?search_query=Recurrence+Relations+Tower+of+Hanoi+Fibonacci" },
                            { name: "Solving Linear Recurrence Relations", vid: "https://www.youtube.com/results?search_query=Solving+linear+recurrence+relation+with+constant+coefficients" }
                        ],
                        pdf: "" 
                    },
                    {
                        name: "UNIT III: Elementary Graph Theory",
                        topics: [
                            { name: "Graph Basics & Terminology", vid: "https://www.youtube.com/results?search_query=Graph+Theory+Basics+Paths+Cycles+Complete+Graphs" },
                            { name: "Euler and Hamiltonian Graphs", vid: "https://www.youtube.com/results?search_query=Euler+and+Hamiltonian+Graphs+Discrete+Math" },
                            { name: "Trees & Planar Graphs", vid: "https://www.youtube.com/results?search_query=Graph+Theory+Trees+Spanning+Tree+Planar+Graphs" }
                        ],
                        pdf: "" 
                    },
                    {
                        name: "UNIT IV: Matrix Algebra",
                        topics: [
                            { name: "Matrix Operations & Determinants", vid: "https://www.youtube.com/results?search_query=Matrix+Algebra+Addition+Multiplication+Determinants" },
                            { name: "Rank, Inverse & Linear Equations", vid: "https://www.youtube.com/results?search_query=Rank+of+Matrix+Inverse+System+of+Linear+Equations" },
                            { name: "Eigenvalues & Cayley-Hamilton Theorem", vid: "https://www.youtube.com/results?search_query=Eigen+values+Eigen+vectors+Cayley+Hamilton+Theorem" }
                        ],
                        pdf: "" 
                    }
                ]
            }
            // Next subjects will go here...
        ],
        "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": []
    },
    "MSc": { "1": [], "2": [], "3": [], "4": [] }
};