/*
 * TopicFlix – Video Listening Assessments
 * 8 topics × 15 questions = 120 questions.
 * Each question is grounded in user-provided transcripts (times are approximate).
 * B1/B2/C1 describe question difficulty, not an official CEFR certification.
 * No external dependencies. Existing getVideoAssessment(topic) API unchanged.
 */

export const videoAssessments = {
  "Daily Conversations": {
    "title": "Factory Safety – Ivan and Gideon",
    "description": "Test your understanding of the conversation about PPE, hazards and workplace risk assessment.",
    "questions": [
      {
        "id": "fs01",
        "level": "B1",
        "time": "1:23",
        "question": "What does PPE stand for?",
        "options": [
          "Personal Protective Equipment",
          "Public Protection Education",
          "Professional Production Equipment",
          "Personal Prevention Exercise"
        ],
        "answer": 0,
        "explanation": "Ivan calls PPE personal protective equipment at about 1:23."
      },
      {
        "id": "fs02",
        "level": "B1",
        "time": "1:36",
        "question": "What do safety helmets protect workers from?",
        "options": [
          "Chemical smells",
          "Falling objects",
          "Loud conversations",
          "Electrical bills"
        ],
        "answer": 1,
        "explanation": "Ivan explains that helmets protect heads from falling objects at about 1:36."
      },
      {
        "id": "fs03",
        "level": "B1",
        "time": "2:29",
        "question": "What should workers do with torn or worn-out gloves?",
        "options": [
          "Wash and reuse them",
          "Keep using them for light tasks",
          "Replace them immediately",
          "Remove them during work"
        ],
        "answer": 2,
        "explanation": "Ivan says torn or worn-out gloves must be replaced immediately around 2:29."
      },
      {
        "id": "fs04",
        "level": "B1",
        "time": "2:06",
        "question": "What can safety goggles protect the eyes from?",
        "options": [
          "Cold weather only",
          "Noise from machines",
          "Heavy objects falling on the feet",
          "Dust, sparks and chemical splashes"
        ],
        "answer": 3,
        "explanation": "At 2:06 Ivan says goggles protect against dust, sparks, and chemical splashes."
      },
      {
        "id": "fs05",
        "level": "B1",
        "time": "4:42",
        "question": "Which three types of hazards does Ivan mention?",
        "options": [
          "Chemical, mechanical and electrical",
          "Physical, financial and social",
          "Medical, biological and digital",
          "Weather, traffic and noise"
        ],
        "answer": 0,
        "explanation": "Ivan lists chemical, mechanical, and electrical hazards near 4:42."
      },
      {
        "id": "fs06",
        "level": "B2",
        "time": "2:15",
        "question": "A worker has a helmet, but it moves around when they bend down. What should they do?",
        "options": [
          "Carry the helmet instead of wearing it",
          "Adjust the fit and strap so it stays in place",
          "Wear goggles instead of the helmet",
          "Ignore the problem because the helmet is present"
        ],
        "answer": 1,
        "explanation": "At 2:15 Ivan says helmets must fit snugly and the strap should be adjusted."
      },
      {
        "id": "fs07",
        "level": "B2",
        "time": "4:58",
        "question": "A worker needs to handle paint. Which protection best matches Ivan’s advice?",
        "options": [
          "A helmet only",
          "Ordinary shoes only",
          "Gloves and a mask",
          "Goggles without other protection"
        ],
        "answer": 2,
        "explanation": "Ivan specifically recommends gloves and a mask for handling paint near 4:58."
      },
      {
        "id": "fs08",
        "level": "B2",
        "time": "5:47",
        "question": "When assessing a hazard, which two factors should a worker consider?",
        "options": [
          "How expensive the equipment is and who bought it",
          "How quickly workers finish their shifts",
          "How often the manager visits",
          "How likely harm is and how severe it could be"
        ],
        "answer": 3,
        "explanation": "At 5:47 Ivan defines risk assessment using likelihood and severity of harm."
      },
      {
        "id": "fs09",
        "level": "B2",
        "time": "6:29",
        "question": "Why should workers report even seemingly small hazards?",
        "options": [
          "Small problems may develop into serious ones",
          "Reports automatically replace all safety equipment",
          "Every small problem means the factory must close",
          "Only large hazards require attention"
        ],
        "answer": 0,
        "explanation": "Near 6:29 Ivan says small issues can snowball into bigger problems."
      },
      {
        "id": "fs10",
        "level": "B2",
        "time": "5:13",
        "question": "Why is water near exposed electrical equipment especially dangerous?",
        "options": [
          "It makes equipment more expensive",
          "It may increase the risk of electrical shock",
          "It makes safety goggles uncomfortable",
          "It prevents workers from seeing chemical labels"
        ],
        "answer": 1,
        "explanation": "Near 5:13 he warns that exposed circuits and wet outlets can cause shocks."
      },
      {
        "id": "fs11",
        "level": "C1",
        "time": "5:30",
        "question": "Which sequence best represents Ivan’s overall approach to preventing accidents?",
        "options": [
          "Wait for an accident, then purchase PPE",
          "Choose a solution before identifying the problem",
          "Observe hazards, assess risks, then apply preventive measures",
          "Focus only on risks that have already injured someone"
        ],
        "answer": 2,
        "explanation": "At 5:30 and 5:56 Ivan explains observe, assess, and choose preventive measures."
      },
      {
        "id": "fs12",
        "level": "C1",
        "time": "6:13",
        "question": "Why are lockout/tagout procedures especially relevant during machine maintenance?",
        "options": [
          "They help workers finish maintenance without training",
          "They make protective gloves unnecessary",
          "They protect machines from dust and scratches",
          "They help prevent machines from being started unexpectedly"
        ],
        "answer": 3,
        "explanation": "At 6:13 he recommends lockout/tagout; around 8:31 the video explains this prevents accidental start-up."
      },
      {
        "id": "fs13",
        "level": "C1",
        "time": "6:05",
        "question": "Which statement best reflects Ivan’s approach to controlling mechanical hazards?",
        "options": [
          "PPE alone is not a substitute for machine guards and safe maintenance procedures",
          "Safety guards are unnecessary whenever workers wear helmets",
          "Reporting hazards is useful only after machinery breaks",
          "Workers should prioritize speed over safety procedures"
        ],
        "answer": 0,
        "explanation": "At 6:05–6:13 Ivan recommends guards and lockout/tagout alongside other protection."
      },
      {
        "id": "fs14",
        "level": "C1",
        "time": "3:02",
        "question": "What is the most defensible interpretation of Ivan’s emergency advice?",
        "options": [
          "PPE guarantees that every emergency is harmless",
          "PPE can provide protection while people evacuate or assist, but does not remove the emergency",
          "Workers should remain near a fire as long as they wear gloves",
          "Chemical spills never require evacuation"
        ],
        "answer": 1,
        "explanation": "At 3:02 Ivan says PPE helps during evacuation or assistance, not that it removes danger."
      },
      {
        "id": "fs15",
        "level": "C1",
        "time": "2:37",
        "question": "Why could poorly maintained goggles create a safety problem even when a worker wears them?",
        "options": [
          "They make helmets fit too tightly",
          "They prevent all types of communication",
          "Dust and scratches can reduce visibility during hazardous tasks",
          "They automatically damage electrical circuits"
        ],
        "answer": 2,
        "explanation": "At 2:37 Ivan explains that dusty or scratched goggles can obstruct vision."
      }
    ]
  },
  "Travel & Tourism": {
    "title": "Hotel Reservation – Jane Smith",
    "description": "A hotel reservation dialogue about dates, rooms, amenities and travel arrangements.",
    "questions": [
      {
        "id": "tt01",
        "level": "B1",
        "time": "0:46",
        "question": "For which dates does the guest want to book a room?",
        "options": [
          "From the 15th to the 20th of the month",
          "From the 1st to the 5th",
          "From the 20th to the 25th",
          "For one night only"
        ],
        "answer": 0,
        "explanation": "Jane requests dates from the 15th through the 20th at approximately 0:46."
      },
      {
        "id": "tt02",
        "level": "B1",
        "time": "1:03",
        "question": "Which room features does the guest initially request?",
        "options": [
          "A double bed and a balcony",
          "Two single beds without a balcony",
          "A suite with a private pool",
          "A single bed near the elevator"
        ],
        "answer": 0,
        "explanation": "At 1:03 she asks for a double bed and a balcony."
      },
      {
        "id": "tt03",
        "level": "B1",
        "time": "1:21",
        "question": "Which view does Jane prefer?",
        "options": [
          "A garden view",
          "A city view",
          "An ocean view",
          "A mountain view"
        ],
        "answer": 0,
        "explanation": "At 1:21 Jane says a garden view sounds peaceful and asks to book it."
      },
      {
        "id": "tt04",
        "level": "B1",
        "time": "1:52",
        "question": "What is the quoted nightly price?",
        "options": [
          "120 dollars, including breakfast",
          "80 dollars without breakfast",
          "150 dollars plus breakfast",
          "200 dollars including dinner"
        ],
        "answer": 0,
        "explanation": "At 1:52 the receptionist quotes $120 per night with complimentary breakfast."
      },
      {
        "id": "tt05",
        "level": "B1",
        "time": "2:23",
        "question": "What time is hotel check-in?",
        "options": [
          "2:00 p.m.",
          "11:00 a.m.",
          "8:00 a.m.",
          "6:00 p.m."
        ],
        "answer": 0,
        "explanation": "The receptionist says check-in begins at 2 p.m. near 2:23."
      },
      {
        "id": "tt06",
        "level": "B2",
        "time": "1:45",
        "question": "What suggests Jane is travelling for relaxation rather than an event?",
        "options": [
          "She says it is a leisure trip, not a special occasion",
          "She mentions a business conference",
          "She books a wedding venue",
          "She needs an airport meeting room"
        ],
        "answer": 0,
        "explanation": "At 1:45 Jane says it is a leisure trip rather than a special occasion."
      },
      {
        "id": "tt07",
        "level": "B2",
        "time": "2:00",
        "question": "Why does Jane react positively to the quoted price?",
        "options": [
          "It fits her budget and includes breakfast",
          "It is the cheapest hotel in the country",
          "It includes all local tours",
          "It is free for the first night"
        ],
        "answer": 0,
        "explanation": "At 2:00 Jane says the quoted rate is within her budget; breakfast is included."
      },
      {
        "id": "tt08",
        "level": "B2",
        "time": "2:31",
        "question": "What does Jane's refusal of the airport shuttle imply?",
        "options": [
          "She does not wish to add that service now",
          "She has cancelled her accommodation",
          "She has no interest in local tours",
          "She cannot travel by airplane"
        ],
        "answer": 0,
        "explanation": "Near 2:31 Jane declines the additional airport shuttle service."
      },
      {
        "id": "tt09",
        "level": "B2",
        "time": "2:51",
        "question": "How can Jane arrange a local excursion after arrival?",
        "options": [
          "Ask at the hotel's front desk",
          "Call a different hotel in another city",
          "Contact the fitness center",
          "Wait until checkout time"
        ],
        "answer": 0,
        "explanation": "At 2:51 the receptionist says Jane can inquire at the front desk later."
      },
      {
        "id": "tt10",
        "level": "B2",
        "time": "3:08",
        "question": "Why does Jane ask for the cancellation policy by email?",
        "options": [
          "To understand booking terms and potential cancellation conditions",
          "To request free room service",
          "To get a list of restaurant ingredients",
          "To change the hotel check-in time"
        ],
        "answer": 0,
        "explanation": "At 3:08 Jane asks for booking details and the cancellation policy by email."
      },
      {
        "id": "tt11",
        "level": "C1",
        "time": "1:13",
        "question": "Which detail best explains why Jane chooses the garden-facing room?",
        "options": [
          "She values a peaceful atmosphere more than a city view",
          "She expects a garden room to be free",
          "She needs to supervise a conference",
          "She dislikes all rooms with balconies"
        ],
        "answer": 0,
        "explanation": "Her preference for a peaceful garden view is directly stated around 1:21."
      },
      {
        "id": "tt12",
        "level": "C1",
        "time": "1:52",
        "question": "Which statement about the hotel price is most justified?",
        "options": [
          "The quoted 120-dollar rate includes complimentary breakfast, but other extras are not stated as included",
          "All excursions are included in the nightly price",
          "Spa treatments and airport transport are free",
          "The guest pays only if she uses the balcony"
        ],
        "answer": 0,
        "explanation": "At 1:52 only the rate and breakfast are stated as included; no broader package is confirmed."
      },
      {
        "id": "tt13",
        "level": "C1",
        "time": "2:37",
        "question": "Which approach best matches the flexibility offered for sightseeing?",
        "options": [
          "Confirm accommodation now and decide on excursions after arriving",
          "Book every activity before confirming the room",
          "Choose excursions only after checking out",
          "Cancel the hotel room to join tours"
        ],
        "answer": 0,
        "explanation": "At 2:51 staff confirm she can decide about excursions after arrival."
      },
      {
        "id": "tt14",
        "level": "C1",
        "time": "3:00",
        "question": "Which sequence of events best captures the reservation process?",
        "options": [
          "Discuss dates and room preferences, review price and services, then confirm and request details by email",
          "Pay for excursions first, then choose travel dates",
          "Confirm without sharing a name or choosing a room",
          "Discuss checkout first, then refuse every available room"
        ],
        "answer": 0,
        "explanation": "From 0:46 through 3:08 they establish dates, preferences, price, services, confirmation and email details."
      },
      {
        "id": "tt15",
        "level": "C1",
        "time": "3:08",
        "question": "Why is requesting written cancellation terms a prudent decision?",
        "options": [
          "It gives Jane a record of conditions that could matter if her plans change",
          "It guarantees a full refund under all circumstances",
          "It replaces the need to confirm a reservation",
          "It proves that all transport is included"
        ],
        "answer": 0,
        "explanation": "Written booking and cancellation information is requested around 3:08; keeping it helps with possible plan changes."
      }
    ]
  },
  "Business & Career": {
    "title": "Supply Chain Efficiency – Lucy and John",
    "description": "A workplace discussion about suppliers, forecasting, logistics, technology and implementation.",
    "questions": [
      {
        "id": "bc01",
        "level": "B1",
        "time": "0:27",
        "question": "What major problem is slowing down production?",
        "options": [
          "Delays in raw material deliveries",
          "Too many customer reviews",
          "A shortage of office chairs",
          "A new advertising campaign"
        ],
        "answer": 0,
        "explanation": "At 0:27 Lucy and John identify delays in raw-material delivery as a problem."
      },
      {
        "id": "bc02",
        "level": "B1",
        "time": "0:43",
        "question": "What supplier strategy is suggested to reduce dependency?",
        "options": [
          "Work with multiple suppliers",
          "Use only one supplier forever",
          "Stop purchasing raw materials",
          "Buy only finished goods"
        ],
        "answer": 0,
        "explanation": "At 0:43 they suggest multiple suppliers to reduce reliance on a single source."
      },
      {
        "id": "bc03",
        "level": "B1",
        "time": "1:21",
        "question": "What is one cost of holding too much inventory?",
        "options": [
          "Higher storage and stock-related costs",
          "Faster product shortages",
          "Lower warehouse expenses in every case",
          "Guaranteed sales growth"
        ],
        "answer": 0,
        "explanation": "At 1:21 they warn that holding excessive stock raises costs."
      },
      {
        "id": "bc04",
        "level": "B1",
        "time": "2:00",
        "question": "What technology is proposed to monitor delivery routes?",
        "options": [
          "Real-time GPS tracking",
          "Handwritten postcards",
          "Customer loyalty cards",
          "Paper-only attendance sheets"
        ],
        "answer": 0,
        "explanation": "At 2:00 they discuss real-time GPS tracking and route optimization."
      },
      {
        "id": "bc05",
        "level": "B1",
        "time": "3:45",
        "question": "Which metric is named as a supply chain KPI?",
        "options": [
          "Inventory turnover",
          "Employee vacation photos",
          "Number of office windows",
          "Social media follower count"
        ],
        "answer": 0,
        "explanation": "Around 3:45–3:53 they mention inventory turnover among their KPIs."
      },
      {
        "id": "bc06",
        "level": "B2",
        "time": "1:29",
        "question": "Why combine historical sales data with market trends?",
        "options": [
          "To forecast demand more accurately and avoid excess inventory",
          "To remove all suppliers permanently",
          "To eliminate customer demand",
          "To replace transportation with advertising"
        ],
        "answer": 0,
        "explanation": "At 1:29–1:37 they propose predictive analytics using sales history and market trends."
      },
      {
        "id": "bc07",
        "level": "B2",
        "time": "2:22",
        "question": "How would warehouse automation help order fulfillment?",
        "options": [
          "By improving picking and packing speed while reducing errors",
          "By increasing unnecessary movement",
          "By forbidding inventory checks",
          "By making products heavier"
        ],
        "answer": 0,
        "explanation": "At 2:22 they say automated picking and packing can speed work and reduce errors."
      },
      {
        "id": "bc08",
        "level": "B2",
        "time": "3:14",
        "question": "What is a combined benefit of sourcing from nearby suppliers?",
        "options": [
          "Shorter delivery times and lower transport emissions",
          "Guaranteed zero costs for all goods",
          "Elimination of the need for contracts",
          "More distant shipping routes"
        ],
        "answer": 0,
        "explanation": "At 3:14 the speakers link local sourcing with shorter deliveries and fewer emissions."
      },
      {
        "id": "bc09",
        "level": "B2",
        "time": "5:36",
        "question": "Why might a cloud-based ERP platform improve supply chain visibility?",
        "options": [
          "It combines supplier, stock and logistics data in one system",
          "It removes the need to track any shipment",
          "It prevents employees from communicating",
          "It only stores marketing videos"
        ],
        "answer": 0,
        "explanation": "At 5:36–5:44 they describe an ERP system integrating supplier, inventory and logistics data."
      },
      {
        "id": "bc10",
        "level": "B2",
        "time": "8:39",
        "question": "Why do the speakers recommend pilot programs before full rollout?",
        "options": [
          "To discover technical issues before wider implementation",
          "To avoid training employees forever",
          "To stop tracking supplier performance",
          "To replace all systems overnight"
        ],
        "answer": 0,
        "explanation": "At 8:39–8:47 they favor pilot programs to identify problems before a wider rollout."
      },
      {
        "id": "bc11",
        "level": "C1",
        "time": "0:50",
        "question": "What trade-off is acknowledged when diversifying suppliers?",
        "options": [
          "Reduced dependency but greater need for effective coordination and quality control",
          "More suppliers eliminate every risk automatically",
          "Using more suppliers means no performance evaluation",
          "Diversification necessarily lowers product quality"
        ],
        "answer": 0,
        "explanation": "At 0:50–0:57 diversification lowers reliance but requires coordination to maintain quality."
      },
      {
        "id": "bc12",
        "level": "C1",
        "time": "4:40",
        "question": "Why do the speakers favor combining fixed contracts with spot purchases?",
        "options": [
          "To balance supplier reliability and cost advantages with flexibility when markets change",
          "To avoid all future purchasing decisions",
          "To keep prices fixed for every product forever",
          "To remove the need for supplier evaluation"
        ],
        "answer": 0,
        "explanation": "At 4:40–4:56 they pair long-term contracts with spot purchases to combine stability and agility."
      },
      {
        "id": "bc13",
        "level": "C1",
        "time": "5:11",
        "question": "What does combining contingency stock with AI-driven risk analysis aim to achieve?",
        "options": [
          "Resilience through preparedness and earlier recognition of possible disruptions",
          "Complete elimination of external shocks",
          "An end to all inventory forecasting",
          "More stock errors and slower decisions"
        ],
        "answer": 0,
        "explanation": "At 5:11–5:28 they combine contingencies with AI analysis to anticipate disruptions."
      },
      {
        "id": "bc14",
        "level": "C1",
        "time": "8:53",
        "question": "What does the emphasis on employee workshops suggest about digital transformation?",
        "options": [
          "Technology adoption depends on people understanding and accepting new processes",
          "Software alone guarantees successful implementation",
          "Employee resistance is never relevant",
          "Training should occur only after a project fails"
        ],
        "answer": 0,
        "explanation": "At 8:47–8:53 they emphasize staff workshops to support adoption and reduce resistance."
      },
      {
        "id": "bc15",
        "level": "C1",
        "time": "9:49",
        "question": "Why evaluate customer satisfaction alongside cost and fulfillment indicators?",
        "options": [
          "Operational improvements matter partly because reliable deliveries influence customer loyalty",
          "Customer feedback replaces every other KPI",
          "The cheapest supply chain must always be best",
          "Supply chain performance cannot affect customers"
        ],
        "answer": 0,
        "explanation": "At 9:49–10:07 they connect faster, reliable delivery and customer satisfaction to loyalty."
      }
    ]
  },
  "Education": {
    "title": "Zion’s School Day – Home, Class and Homework",
    "description": "A day-in-the-life English dialogue featuring Zion, his mother and his teacher.",
    "questions": [
      {
        "id": "ed01",
        "level": "B1",
        "time": "0:04",
        "question": "What does Zion's mother ask him to do soon after waking up?",
        "options": [
          "Make his bed",
          "Cook dinner",
          "Write a letter",
          "Go shopping"
        ],
        "answer": 0,
        "explanation": "At 0:04 Mom asks Zion to wake up and make his bed."
      },
      {
        "id": "ed02",
        "level": "B1",
        "time": "1:29",
        "question": "What time does Zion say it is in the morning?",
        "options": [
          "Seven o'clock",
          "Six o'clock",
          "Nine o'clock",
          "Ten o'clock"
        ],
        "answer": 0,
        "explanation": "At 1:29 Zion says it is 7:00."
      },
      {
        "id": "ed03",
        "level": "B1",
        "time": "3:28",
        "question": "What has Zion's mother packed for lunch?",
        "options": [
          "A sandwich and some fruit",
          "Pizza and soda",
          "Rice and fish",
          "Soup and cake"
        ],
        "answer": 0,
        "explanation": "At 3:28 he identifies a sandwich and fruit packed for lunch."
      },
      {
        "id": "ed04",
        "level": "B1",
        "time": "6:38",
        "question": "What color is the ball in the classroom question?",
        "options": [
          "Red",
          "Blue",
          "Green",
          "Yellow"
        ],
        "answer": 0,
        "explanation": "At 6:38 the classroom question identifies the ball as red."
      },
      {
        "id": "ed05",
        "level": "B1",
        "time": "7:37",
        "question": "What does Zion tell his mother he learned at school?",
        "options": [
          "New English words",
          "How to drive a car",
          "How to play the violin",
          "How to bake bread"
        ],
        "answer": 0,
        "explanation": "At 7:37 Zion says he learned new English words."
      },
      {
        "id": "ed06",
        "level": "B2",
        "time": "3:13",
        "question": "Why does his mother remind Zion to put a water bottle in the bag?",
        "options": [
          "To help him stay hydrated during the school day",
          "To replace his school books",
          "To help him wash his shoes",
          "To give it to the teacher as homework"
        ],
        "answer": 0,
        "explanation": "Around 3:13–3:20 Mom says to take a water bottle and stay hydrated."
      },
      {
        "id": "ed07",
        "level": "B2",
        "time": "5:48",
        "question": "Why does Zion greet the teacher when he arrives?",
        "options": [
          "His mother prompts him to use a polite school greeting",
          "He wants to cancel class",
          "He has forgotten his lunch",
          "He wants to go straight home"
        ],
        "answer": 0,
        "explanation": "At 5:48 Mom asks Zion to greet his teacher in the morning."
      },
      {
        "id": "ed08",
        "level": "B2",
        "time": "6:31",
        "question": "What learning activity are the pupils doing when they identify the ball's color?",
        "options": [
          "Practising English through simple classroom questions",
          "Taking a mathematics exam",
          "Preparing a school play",
          "Learning road safety signs"
        ],
        "answer": 0,
        "explanation": "At 6:31–6:38 the teacher practises English with a color question."
      },
      {
        "id": "ed09",
        "level": "B2",
        "time": "9:11",
        "question": "Which instruction shows his mother is emphasizing playground safety?",
        "options": [
          "Hold on tightly when using the swing",
          "Run into the street alone",
          "Ignore the swing ropes",
          "Leave without telling her"
        ],
        "answer": 0,
        "explanation": "At 9:11 Mom tells Zion to hold tightly on the swing."
      },
      {
        "id": "ed10",
        "level": "B2",
        "time": "11:07",
        "question": "How does Zion's mother help him understand an unfamiliar word?",
        "options": [
          "She tells him to use the picture as a clue",
          "She tells him to stop reading",
          "She gives him an unrelated math problem",
          "She asks him to skip all homework"
        ],
        "answer": 0,
        "explanation": "At 11:07 Mom suggests looking at the picture for a clue."
      },
      {
        "id": "ed11",
        "level": "C1",
        "time": "2:58",
        "question": "What does the school-bag routine most strongly teach beyond vocabulary?",
        "options": [
          "Preparation and responsibility through checking needed items",
          "That school supplies should be left at home",
          "That adults must do every task for children",
          "That lunch replaces classroom learning"
        ],
        "answer": 0,
        "explanation": "At 2:58–3:39 they check books, pencils, lunch and shoes, illustrating preparation."
      },
      {
        "id": "ed12",
        "level": "C1",
        "time": "4:08",
        "question": "How do the breakfast exchanges support the video's overall learning style?",
        "options": [
          "They connect repeated everyday English phrases with familiar routines",
          "They teach only scientific terminology",
          "They avoid interaction between speakers",
          "They focus exclusively on difficult grammar rules"
        ],
        "answer": 0,
        "explanation": "At 4:08–4:31 routine breakfast questions and repeated replies build familiar English."
      },
      {
        "id": "ed13",
        "level": "C1",
        "time": "7:30",
        "question": "What can be inferred from Zion reporting that he answered questions in class?",
        "options": [
          "He participated actively and felt positive about learning",
          "He was absent from school",
          "He refused to speak to the teacher",
          "He completed a university examination"
        ],
        "answer": 0,
        "explanation": "At 7:30–7:37 Zion positively reports his school day and participation."
      },
      {
        "id": "ed14",
        "level": "C1",
        "time": "10:26",
        "question": "Which combination best reflects Zion's most valued parts of the day?",
        "options": [
          "His English lesson and time at the park with his mother",
          "Buying toys and watching television",
          "Doing extra chores and missing recess",
          "Taking a long bus journey and visiting a museum"
        ],
        "answer": 0,
        "explanation": "At 10:26 Zion names English class and park time with Mom as favorites."
      },
      {
        "id": "ed15",
        "level": "C1",
        "time": "11:03",
        "question": "Which educational principle is illustrated when his mother offers a picture clue rather than the answer?",
        "options": [
          "Guided problem-solving that helps Zion work it out himself",
          "Avoiding difficult words permanently",
          "Punishing all incorrect guesses",
          "Replacing reading with memorization alone"
        ],
        "answer": 0,
        "explanation": "At 11:03–11:13 Mom prompts Zion to infer the word from a picture instead of supplying it."
      }
    ]
  },
  "Technology": {
    "title": "Science and Technology – Benefits, Risks and the Future",
    "description": "A podcast discussion between Naira and Meera about progress and responsibility.",
    "questions": [
      {
        "id": "te01",
        "level": "B1",
        "time": "0:08",
        "question": "Who hosts the science and technology discussion?",
        "options": [
          "Naira and Meera",
          "Jane and Ivan",
          "Zion and his teacher",
          "Lucy and John"
        ],
        "answer": 0,
        "explanation": "At 0:08 and in the introduction, Naira and Meera identify themselves as co-hosts."
      },
      {
        "id": "te02",
        "level": "B1",
        "time": "1:08",
        "question": "Which medical developments do the hosts mention?",
        "options": [
          "Vaccines, surgeries and genetic research",
          "Only herbal tea and exercise",
          "Car repairs and shipping routes",
          "Hotel amenities and tourism"
        ],
        "answer": 0,
        "explanation": "At 1:08 they cite vaccines, surgeries and genetic research."
      },
      {
        "id": "te03",
        "level": "B1",
        "time": "2:19",
        "question": "Which problem is identified as a psychological downside of technology?",
        "options": [
          "Social media addiction",
          "Faster online payments",
          "Improved transportation",
          "Better medical research"
        ],
        "answer": 0,
        "explanation": "Around 2:19 they mention addiction, misinformation and loneliness."
      },
      {
        "id": "te04",
        "level": "B1",
        "time": "3:26",
        "question": "Which educational technology is mentioned?",
        "options": [
          "Smartboards and tablets",
          "Typewriters only",
          "Steam engines",
          "Paper maps exclusively"
        ],
        "answer": 0,
        "explanation": "At 3:26 smartboards, tablets and educational apps are mentioned."
      },
      {
        "id": "te05",
        "level": "B1",
        "time": "7:23",
        "question": "Which future possibility do the hosts discuss?",
        "options": [
          "Colonies on Mars",
          "Eliminating all computers",
          "Returning to horse-drawn transport",
          "Closing every online school"
        ],
        "answer": 0,
        "explanation": "Around 7:23–7:31 the speakers speculate about Mars colonies."
      },
      {
        "id": "te06",
        "level": "B2",
        "time": "2:27",
        "question": "What do the hosts mean by being digitally connected but emotionally disconnected?",
        "options": [
          "Online communication may increase while loneliness and weaker personal bonds remain",
          "The internet has no communication tools",
          "Technology prevents people from sending messages",
          "All digital relationships are necessarily stronger"
        ],
        "answer": 0,
        "explanation": "At 2:27 they contrast digital connection with emotional disconnection."
      },
      {
        "id": "te07",
        "level": "B2",
        "time": "3:40",
        "question": "How can online education benefit a student living in a small village?",
        "options": [
          "It can provide access to courses at distant universities",
          "It eliminates the need to learn basic skills",
          "It guarantees every student a free device",
          "It prevents learners from studying at their own pace"
        ],
        "answer": 0,
        "explanation": "At 3:40 a rural student taking courses from top universities illustrates access."
      },
      {
        "id": "te08",
        "level": "B2",
        "time": "4:20",
        "question": "Why could digital learning increase inequality?",
        "options": [
          "Some learners lack reliable internet access or devices",
          "Every student receives identical resources",
          "Technology removes all education costs",
          "Teachers never use digital tools"
        ],
        "answer": 0,
        "explanation": "Around 4:20 they warn of unequal access to internet and devices."
      },
      {
        "id": "te09",
        "level": "B2",
        "time": "4:50",
        "question": "What concern do the hosts express about excessive AI assistance?",
        "options": [
          "Students may rely on quick answers instead of developing critical thinking",
          "Students will automatically become better critical thinkers",
          "Teachers will have more free time in every case",
          "All learning apps will stop working"
        ],
        "answer": 0,
        "explanation": "At 4:50 and 5:00 they criticize reliance on quick AI answers over critical thinking."
      },
      {
        "id": "te10",
        "level": "B2",
        "time": "6:34",
        "question": "How might new technology help address environmental damage?",
        "options": [
          "Through renewable energy, electric vehicles and recycling innovations",
          "By increasing waste without limits",
          "By banning environmental research",
          "By making transport exclusively fossil-fuelled"
        ],
        "answer": 0,
        "explanation": "At 6:34–6:44 renewable energy, electric cars and recycling technology are mentioned."
      },
      {
        "id": "te11",
        "level": "C1",
        "time": "3:02",
        "question": "Why do the hosts call science and technology a double-edged sword?",
        "options": [
          "The same progress can create major benefits and harms depending on its use",
          "Every invention has exactly two mechanical parts",
          "Technology is always harmful",
          "Scientific progress has no social consequences"
        ],
        "answer": 0,
        "explanation": "At 3:02 the hosts describe progress as a double-edged sword."
      },
      {
        "id": "te12",
        "level": "C1",
        "time": "5:00",
        "question": "What does the phrase 'technology should support learning, not replace it' imply?",
        "options": [
          "Human judgment, teaching and critical thinking remain essential",
          "AI answers should replace every teacher",
          "All online courses should be forbidden",
          "Students should never use digital tools"
        ],
        "answer": 0,
        "explanation": "At 5:00–5:20 they say teachers and human judgment remain central."
      },
      {
        "id": "te13",
        "level": "C1",
        "time": "6:44",
        "question": "What tension is highlighted by technology solving problems it previously created?",
        "options": [
          "Innovation can cause environmental harm yet also offer ways to reduce it",
          "Environmental damage is impossible in modern industry",
          "New inventions have no unintended effects",
          "Recycling is unrelated to technology"
        ],
        "answer": 0,
        "explanation": "At 6:44 they explicitly describe technology helping solve problems it contributed to."
      },
      {
        "id": "te14",
        "level": "C1",
        "time": "8:09",
        "question": "Why do the speakers insist on both high-tech and high ethics?",
        "options": [
          "Greater technical capability requires equally thoughtful human decisions about its use",
          "Advanced systems automatically make moral choices correctly",
          "Ethical questions disappear as AI improves",
          "Human responsibility matters only for older technology"
        ],
        "answer": 0,
        "explanation": "At 8:09–8:14 they connect technical advances with human ethics and responsibility."
      },
      {
        "id": "te15",
        "level": "C1",
        "time": "8:49",
        "question": "Which conclusion most closely captures the podcast's overall message?",
        "options": [
          "Technology is a tool whose outcomes depend on balanced and responsible human choices",
          "Technology should replace all human relationships",
          "Scientific discoveries have no meaningful benefits",
          "Every problem has a purely technical solution"
        ],
        "answer": 0,
        "explanation": "At 8:49 they conclude that technology is neither enemy nor savior, but a tool."
      }
    ]
  },
  "Food & Lifestyle": {
    "title": "Food, Health and Lifestyle – Everyday English",
    "description": "A vocabulary explainer about meals, dining out, eating habits and balanced diets.",
    "questions": [
      {
        "id": "fl01",
        "level": "B1",
        "time": "1:10",
        "question": "What does the speaker say junk food often contains a lot of?",
        "options": [
          "Calories, sugar and salt",
          "Fiber and vitamins only",
          "Protein and water only",
          "Fresh vegetables only"
        ],
        "answer": 0,
        "explanation": "At 1:10 junk food is described as high in calories, sugar and salt."
      },
      {
        "id": "fl02",
        "level": "B1",
        "time": "1:42",
        "question": "What does 'perishable food' mean in the video?",
        "options": [
          "Food that can spoil quickly if stored improperly",
          "Food that never expires",
          "Food served only at restaurants",
          "Food grown exclusively without pesticides"
        ],
        "answer": 0,
        "explanation": "At 1:42 perishable foods are described as spoiling quickly without proper storage."
      },
      {
        "id": "fl03",
        "level": "B1",
        "time": "2:33",
        "question": "What does 'a square meal' mean?",
        "options": [
          "A proper, complete and satisfying meal",
          "A meal served on a square plate",
          "A tiny snack eaten quickly",
          "A meal consisting only of dessert"
        ],
        "answer": 0,
        "explanation": "At 2:33 a square meal is defined as a proper, complete meal."
      },
      {
        "id": "fl04",
        "level": "B1",
        "time": "4:55",
        "question": "What does 'foot the bill' mean?",
        "options": [
          "Pay for the meal",
          "Dance after dinner",
          "Cook the food",
          "Complain about the service"
        ],
        "answer": 0,
        "explanation": "At 4:55 the speaker defines foot the bill as paying for the meal."
      },
      {
        "id": "fl05",
        "level": "B1",
        "time": "5:32",
        "question": "What does having a 'sweet tooth' mean?",
        "options": [
          "Enjoying sugary foods",
          "Avoiding every dessert",
          "Being unable to chew",
          "Preferring salty drinks only"
        ],
        "answer": 0,
        "explanation": "At 5:32 a sweet tooth means enjoying sugary foods."
      },
      {
        "id": "fl06",
        "level": "B2",
        "time": "1:50",
        "question": "Why does the speaker advise refrigeration and checking expiration dates for some foods?",
        "options": [
          "Perishable foods can spoil and need proper storage",
          "All food must be frozen forever",
          "Expiration dates apply only to restaurants",
          "Refrigeration always removes every nutrient"
        ],
        "answer": 0,
        "explanation": "At 1:50 refrigeration and expiration checks are advised for perishables."
      },
      {
        "id": "fl07",
        "level": "B2",
        "time": "2:24",
        "question": "What distinguishes a quick snack from the speaker's idea of a hearty meal?",
        "options": [
          "A snack is small and convenient while a hearty meal is substantial and filling",
          "A snack is always more expensive",
          "A hearty meal must be eaten outdoors",
          "A snack always contains more nutrients"
        ],
        "answer": 0,
        "explanation": "At 2:24–2:46 the video contrasts small snacks with substantial meals."
      },
      {
        "id": "fl08",
        "level": "B2",
        "time": "3:50",
        "question": "Who best fits the description 'fussy eater'?",
        "options": [
          "Someone who refuses many foods, such as green vegetables",
          "Someone who always chooses the largest portion",
          "Someone who eats everything on the menu",
          "Someone who pays the restaurant bill"
        ],
        "answer": 0,
        "explanation": "At 3:50 a child refusing green vegetables illustrates a fussy eater."
      },
      {
        "id": "fl09",
        "level": "B2",
        "time": "4:39",
        "question": "Why might someone be upset about being overcharged at a posh restaurant?",
        "options": [
          "They are asked to pay more than the meal is worth",
          "They were offered a complimentary gift",
          "The meal came from their own kitchen",
          "They ate too slowly"
        ],
        "answer": 0,
        "explanation": "At 4:39–4:55 overcharging is charging more than food is worth."
      },
      {
        "id": "fl10",
        "level": "B2",
        "time": "7:06",
        "question": "What sources of protein are suggested for vegetarians?",
        "options": [
          "Beans, nuts and soy products",
          "Only steak and chicken",
          "Sugary soda and candy",
          "Butter and table salt"
        ],
        "answer": 0,
        "explanation": "At 7:06 beans, nuts and soy are listed as vegetarian protein options."
      },
      {
        "id": "fl11",
        "level": "C1",
        "time": "1:02",
        "question": "What central contrast does the speaker draw between junk food and organic food?",
        "options": [
          "One is described as calorie-dense and nutrient-poor while the other is defined by specific farming practices",
          "Both labels mean precisely the same thing",
          "Organic food is defined only by its price",
          "Junk food is defined by being grown without chemicals"
        ],
        "answer": 0,
        "explanation": "At 1:02–1:32 the video contrasts junk food nutrition with organic production rules."
      },
      {
        "id": "fl12",
        "level": "C1",
        "time": "3:19",
        "question": "What does 'spoil your appetite' imply in the cookie-before-dinner example?",
        "options": [
          "Eating too much beforehand reduces the desire for the main meal",
          "Food becomes contaminated immediately",
          "The dinner plate breaks",
          "Cookies improve appetite for every person"
        ],
        "answer": 0,
        "explanation": "At 3:12–3:19 it explains cookies before dinner can spoil appetite."
      },
      {
        "id": "fl13",
        "level": "C1",
        "time": "5:55",
        "question": "Why does the speaker use 'make your mouth water' rather than a literal physical description?",
        "options": [
          "To express how strongly the sight or smell of appetizing food makes someone want to eat",
          "To say a dish contains too much water",
          "To criticize all sweet food",
          "To describe drinking water after a meal"
        ],
        "answer": 0,
        "explanation": "At 5:55 the idiom describes food that looks or smells tempting."
      },
      {
        "id": "fl14",
        "level": "C1",
        "time": "6:19",
        "question": "What does the variety of vegetarian motivations imply?",
        "options": [
          "Dietary choices can reflect health, environmental and ethical priorities",
          "All vegetarians follow the same reason",
          "Vegetarian diets exclude all protein",
          "Environmental concerns have no role in food decisions"
        ],
        "answer": 0,
        "explanation": "At 6:19–6:26 health, environment and animal welfare are listed as motivations."
      },
      {
        "id": "fl15",
        "level": "C1",
        "time": "7:15",
        "question": "Why does the speaker mention fortified foods and nutrients like B12 in a vegetarian diet?",
        "options": [
          "A balanced diet may require attention to nutrients that are less readily available from typical plant foods",
          "All plant foods provide identical nutrients",
          "Vegetarians should eat only sugary snacks",
          "Protein is the only nutrient worth considering"
        ],
        "answer": 0,
        "explanation": "At 7:06–7:23 it discusses B12, fortified foods and balanced nutrition."
      }
    ]
  },
  "Movies & Entertainment": {
    "title": "Rebecca, Peter and Mr. Gibson – Workplace Drama",
    "description": "A short drama about a job interview, class prejudice, a branch-manager offer and hidden motives.",
    "questions": [
      {
        "id": "me01",
        "level": "B1",
        "time": "1:53",
        "question": "Why does Rebecca visit Mr. Gibson's workplace?",
        "options": [
          "For a job interview",
          "To book a hotel room",
          "To buy a new car",
          "To meet a school teacher"
        ],
        "answer": 0,
        "explanation": "At 1:53 Rebecca says she is there for an interview."
      },
      {
        "id": "me02",
        "level": "B1",
        "time": "2:01",
        "question": "What job does Peter have?",
        "options": [
          "Mr. Gibson's driver",
          "The company's accountant",
          "A hotel receptionist",
          "A safety officer"
        ],
        "answer": 0,
        "explanation": "At 2:01 Mr. Gibson introduces Peter as his driver."
      },
      {
        "id": "me03",
        "level": "B1",
        "time": "2:10",
        "question": "What impresses Mr. Gibson about Rebecca at first?",
        "options": [
          "Her resume",
          "Her expensive car",
          "Her vacation plans",
          "Her knowledge of gardening"
        ],
        "answer": 0,
        "explanation": "At 2:10 Mr. Gibson compliments Rebecca’s resume."
      },
      {
        "id": "me04",
        "level": "B1",
        "time": "6:08",
        "question": "What personal circumstance does Rebecca disclose to Mr. Gibson?",
        "options": [
          "She has a sick son and needs the job",
          "She is leaving the country tomorrow",
          "She owns the Northwest branch",
          "She has no family responsibilities"
        ],
        "answer": 0,
        "explanation": "At 6:08 Rebecca explains that she has a sick son and needs the job."
      },
      {
        "id": "me05",
        "level": "B1",
        "time": "6:44",
        "question": "What position does Mr. Gibson initially offer Rebecca?",
        "options": [
          "Director of one of the company's branches",
          "Personal chauffeur",
          "Hotel manager",
          "School librarian"
        ],
        "answer": 0,
        "explanation": "At 6:44 she is offered a directorship of a company branch."
      },
      {
        "id": "me06",
        "level": "B2",
        "time": "2:43",
        "question": "What is Peter's main objection to Rebecca joining the company?",
        "options": [
          "He looks down on her because she is poor",
          "She does not speak English",
          "She refuses to attend the interview",
          "She already owns a rival company"
        ],
        "answer": 0,
        "explanation": "At 2:43 Peter disparages Rebecca for being poor."
      },
      {
        "id": "me07",
        "level": "B2",
        "time": "3:17",
        "question": "Why does Peter apologize to Rebecca after his earlier behavior?",
        "options": [
          "He wants to repair the situation and gain her cooperation",
          "He needs her to teach him driving",
          "He wants to cancel his interview",
          "He is asking for her lunch order"
        ],
        "answer": 0,
        "explanation": "At 3:17–3:41 Peter apologizes and encourages Rebecca to cooperate."
      },
      {
        "id": "me08",
        "level": "B2",
        "time": "4:59",
        "question": "Why has Rebecca found job hunting especially difficult?",
        "options": [
          "She is a single mother caring for a child",
          "She has never worked in her life",
          "She has moved abroad",
          "She refuses to accept any salary"
        ],
        "answer": 0,
        "explanation": "At 4:59 Rebecca describes how difficult finding work can be as a single mother."
      },
      {
        "id": "me09",
        "level": "B2",
        "time": "7:37",
        "question": "Why is the offered salary particularly meaningful to Rebecca?",
        "options": [
          "It could help pay for her son's recovery and treatment",
          "It would buy a private airplane",
          "It would fund a company-wide holiday",
          "It would cover Peter's car wash"
        ],
        "answer": 0,
        "explanation": "At 7:37–7:43 Mr. Gibson links the new salary with her son’s recovery."
      },
      {
        "id": "me10",
        "level": "B2",
        "time": "8:05",
        "question": "What important fact is revealed about the Northwest branch?",
        "options": [
          "It is bankrupt or deeply in debt",
          "It is the most profitable branch",
          "It has just opened a luxury hotel",
          "It has no employees yet"
        ],
        "answer": 0,
        "explanation": "At 8:05–8:14 the Northwest branch is described as bankrupt and in debt."
      },
      {
        "id": "me11",
        "level": "C1",
        "time": "8:14",
        "question": "What appears to be Mr. Gibson's hidden purpose in promoting Rebecca?",
        "options": [
          "Shift responsibility for the troubled Northwest branch onto her",
          "Give her a risk-free reward with no conditions",
          "Help Peter find a better car",
          "Close the branch before anyone accepts the role"
        ],
        "answer": 0,
        "explanation": "At 8:14–8:22 Mr. Gibson says he wants Rebecca to bear responsibility for the troubled branch."
      },
      {
        "id": "me12",
        "level": "C1",
        "time": "8:38",
        "question": "How does Mr. Gibson hope to benefit publicly from Rebecca's story?",
        "options": [
          "He expects favorable coverage and a boost to his reputation",
          "He hopes reporters will ignore the announcement",
          "He wants to keep all promotions secret",
          "He intends to stop the press conference"
        ],
        "answer": 0,
        "explanation": "At 8:38–8:53 he expects press attention and a rise in his public rating."
      },
      {
        "id": "me13",
        "level": "C1",
        "time": "8:05",
        "question": "What makes the promotion offer ethically troubling despite its generous salary?",
        "options": [
          "The branch's financial problems are concealed while Rebecca is vulnerable and hopeful",
          "Rebecca already knows every financial detail",
          "The salary is smaller than her previous job",
          "There is no public announcement planned"
        ],
        "answer": 0,
        "explanation": "The concealed bankruptcy at 8:05–8:22 changes how the earlier job offer should be interpreted."
      },
      {
        "id": "me14",
        "level": "C1",
        "time": "9:18",
        "question": "What does Mr. Gibson's warning to Peter suggest about their relationship?",
        "options": [
          "Peter's position depends on obeying Mr. Gibson despite questionable decisions",
          "Peter has complete freedom to reject all instructions",
          "Mr. Gibson is unfamiliar with Peter",
          "Peter has already left the company"
        ],
        "answer": 0,
        "explanation": "At 9:00–9:18 Gibson rewards Peter, then threatens him if he does not comply."
      },
      {
        "id": "me15",
        "level": "C1",
        "time": "10:29",
        "question": "How does the press-conference scene complicate Mr. Gibson's plan?",
        "options": [
          "Public questions about helping Rebecca and her child raise pressure to act on his charitable image",
          "The media never notices Rebecca",
          "Rebecca has already rejected the position",
          "The company announces that the branch never existed"
        ],
        "answer": 0,
        "explanation": "At 10:20–10:38 reporters ask about charity and the child’s recovery, disrupting his easy public-relations narrative."
      }
    ]
  },
  "Environment": {
    "title": "Environmental English – Pollution and Climate Change",
    "description": "A vocabulary lesson on pollution, fossil fuels, carbon footprints and the three Rs.",
    "questions": [
      {
        "id": "en01",
        "level": "B1",
        "time": "2:27",
        "question": "What is an environmentalist, according to the speaker?",
        "options": [
          "A person who cares about the environment and raises awareness",
          "Someone who only sells cars",
          "A worker who repairs mobile phones",
          "A person who avoids all outdoor activity"
        ],
        "answer": 0,
        "explanation": "At 2:27 the video defines an environmentalist as someone who cares and raises awareness."
      },
      {
        "id": "en02",
        "level": "B1",
        "time": "3:18",
        "question": "What is smog described as?",
        "options": [
          "Thick air pollution similar to fog",
          "A type of renewable energy",
          "Clean rainwater",
          "A kind of forest"
        ],
        "answer": 0,
        "explanation": "At 3:18 smog is explained as heavy air pollution similar to fog."
      },
      {
        "id": "en03",
        "level": "B1",
        "time": "3:32",
        "question": "What does deforestation mean?",
        "options": [
          "Cutting down large numbers of trees",
          "Planting new forests",
          "Collecting rainwater",
          "Sorting household paper"
        ],
        "answer": 0,
        "explanation": "At 3:32 deforestation is described as cutting down large areas of trees."
      },
      {
        "id": "en04",
        "level": "B1",
        "time": "5:45",
        "question": "Which items are named as fossil fuels?",
        "options": [
          "Gas and oil",
          "Solar panels and wind turbines",
          "Reusable bags and glass bottles",
          "Fresh water and oxygen"
        ],
        "answer": 0,
        "explanation": "At 5:45 gas and oil are given as fossil-fuel examples."
      },
      {
        "id": "en05",
        "level": "B1",
        "time": "10:11",
        "question": "What are the three Rs mentioned in the video?",
        "options": [
          "Reduce, reuse and recycle",
          "Read, rewrite and repeat",
          "Repair, rent and return",
          "Rest, relax and recover"
        ],
        "answer": 0,
        "explanation": "At 10:11 the speaker names reduce, reuse and recycle."
      },
      {
        "id": "en06",
        "level": "B2",
        "time": "4:48",
        "question": "Why does the speaker connect global warming with rising sea levels?",
        "options": [
          "Higher temperatures contribute to melting ice and related environmental changes",
          "Sea levels rise because forests grow faster",
          "Plastic bags directly create mountains",
          "It is unrelated to climate change"
        ],
        "answer": 0,
        "explanation": "At 4:48–5:05 the lesson discusses melting ice, rising seas and habitats."
      },
      {
        "id": "en07",
        "level": "B2",
        "time": "5:05",
        "question": "What does the loss of natural habitats mean for animals?",
        "options": [
          "The places where they live are being damaged or destroyed",
          "They automatically become healthier",
          "They all move to the same city",
          "They no longer need food"
        ],
        "answer": 0,
        "explanation": "At 5:05 natural habitat is defined as the place an animal lives."
      },
      {
        "id": "en08",
        "level": "B2",
        "time": "6:45",
        "question": "What does the speaker mean by a person's carbon footprint?",
        "options": [
          "The pollution and emissions associated with that person's activities",
          "The size of their shoes",
          "The number of trees in their garden",
          "Their total time spent walking"
        ],
        "answer": 0,
        "explanation": "At 6:45–7:01 the carbon footprint is described as one’s personal pollution legacy."
      },
      {
        "id": "en09",
        "level": "B2",
        "time": "7:20",
        "question": "Why does the speaker recommend cycling or walking instead of driving?",
        "options": [
          "It can reduce emissions associated with using fossil fuels",
          "It always makes a journey faster",
          "It increases fuel consumption",
          "It prevents people from recycling"
        ],
        "answer": 0,
        "explanation": "At 7:20 and 7:48 the speaker advises cycling, walking and transit to reduce emissions."
      },
      {
        "id": "en10",
        "level": "B2",
        "time": "8:36",
        "question": "Which energy sources are identified as renewable?",
        "options": [
          "Solar power and wind power",
          "Coal and oil",
          "Gasoline and diesel",
          "Natural gas and coal"
        ],
        "answer": 0,
        "explanation": "At 8:36 solar and wind are listed as renewable sources."
      },
      {
        "id": "en11",
        "level": "C1",
        "time": "6:53",
        "question": "Why does the footprint metaphor support the speaker's message?",
        "options": [
          "It stresses that our activities leave effects that persist for others and future generations",
          "It suggests pollution is visible only on sand",
          "It means walking always increases emissions",
          "It claims people can erase every environmental impact instantly"
        ],
        "answer": 0,
        "explanation": "At 6:23–7:11 the footprint metaphor describes traces left for future generations."
      },
      {
        "id": "en12",
        "level": "C1",
        "time": "7:29",
        "question": "What is the intended lesson of the example of avoiding air travel?",
        "options": [
          "Personal transport choices can be changed to reduce environmental impact",
          "All flights have been legally banned",
          "Boats produce no emissions under any circumstances",
          "Only public figures can take environmental action"
        ],
        "answer": 0,
        "explanation": "At 7:29–7:48 the example contrasts flying with choosing other transport."
      },
      {
        "id": "en13",
        "level": "C1",
        "time": "9:25",
        "question": "How does 'endangered' differ from 'extinct' in the lesson?",
        "options": [
          "Endangered species risk disappearing, while extinct species no longer exist",
          "Both always mean the same thing",
          "Extinct species are only temporarily missing",
          "Endangered species have already disappeared forever"
        ],
        "answer": 0,
        "explanation": "At 9:25–9:39 endangered means at risk, while extinct means no longer existing."
      },
      {
        "id": "en14",
        "level": "C1",
        "time": "10:27",
        "question": "Which action best demonstrates 'reuse' rather than 'recycle' or 'reduce'?",
        "options": [
          "Finding another purpose for an item instead of throwing it away",
          "Putting paper into a recycling collection",
          "Buying fewer single-use plastics",
          "Switching to wind-generated electricity"
        ],
        "answer": 0,
        "explanation": "At 10:27–10:42 reuse is explained as finding another purpose for a used item."
      },
      {
        "id": "en15",
        "level": "C1",
        "time": "8:59",
        "question": "Why does the speaker emphasize impacts on future generations?",
        "options": [
          "Current environmental decisions create consequences for people who come later",
          "Only people alive now are affected",
          "Wildlife is independent of environmental conditions",
          "Pollution disappears before the next generation"
        ],
        "answer": 0,
        "explanation": "At 8:59–9:18 the lesson states that present actions affect future generations and wildlife."
      }
    ]
  }
}

export function getVideoAssessment(topic) {
  return videoAssessments[topic] || null
}
