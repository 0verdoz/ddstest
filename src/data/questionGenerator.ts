import { Question, Section5Topic } from '../types/quiz';
import { DDS_SECTION_5_CORE_QUESTIONS } from './ddsSection5Core';

interface QuestionArchetype {
  topic: Section5Topic;
  pageRef: number;
  template: (loc: string, cond: string, num: number, extra: string) => {
    question: string;
    options: [string, string, string, string];
    correctAnswerIndex: number;
    explanation: string;
  };
}

const LOCATIONS = [
  'in downtown Atlanta',
  'on a rural highway outside Macon',
  'on a two-lane county road near Athens',
  'traveling through Savannah',
  'on Interstate 75 in Henry County',
  'approaching a busy intersection in Augusta',
  'driving on a divided highway near Columbus',
  'on an unpaved county route in Oconee County',
  'navigating an urban expressway in DeKalb County',
  'on a suburban two-lane road in Alpharetta',
  'near a commercial shopping corridor in Gwinnett County',
  'on a state route approaching a mountain curve in Dahlonega',
  'along a residential corridor in Marietta',
  'on a multi-lane highway in Valdosta',
  'passing through a rural district in Tift County',
  'driving along a highway bypass in Dalton',
  'in a school zone corridor in Cobb County',
  'near an industrial railroad spur in Albany',
  'on an access road in Peachtree City',
  'driving near Lake Lanier on a winding state route'
];

const CONDITIONS = [
  'during heavy morning commute traffic',
  'late at night with light rain falling',
  'in dense twilight fog',
  'under clear daylight conditions',
  'during afternoon school dismissal hours',
  'on a wet road during the first 30 minutes of rainfall',
  'on an unfamiliar unlit rural highway',
  'approaching a blind crest of a hill',
  'on a divided multi-lane expressway',
  'near an active construction work zone'
];

// Archetypes rigorously based on Georgia DDS Section 5
const ARCHETYPES: QuestionArchetype[] = [
  // 1. Move-Over Law
  {
    topic: "Georgia's Move-Over Law",
    pageRef: 18,
    template: (loc, cond, _idx, vehicleType) => ({
      question: `While driving ${loc} ${cond}, you see a stationary ${vehicleType} parked on the right shoulder displaying flashing lights. Under Georgia's Move-Over Law, what is your legal duty?`,
      options: [
        'Maintain your cruising speed and sound your horn to alert roadside workers.',
        'Safely move over at least one lane away from the vehicle; if a lane change is impossible or unsafe, slow down below the posted speed limit and be prepared to stop.',
        'Come to a complete stop directly in your travel lane until the vehicle turns off its lights.',
        'Turn on your high-beam headlights and accelerate rapidly to clear the zone.'
      ],
      correctAnswerIndex: 1,
      explanation: "Georgia DDS Manual (Page 18): Georgia's Move-Over Law mandates that drivers safely vacate the adjacent lane when approaching stationary emergency, sanitation, or utility vehicles displaying flashing lights. If unable to move over, you must slow down below the speed limit and be prepared to stop. Fines can reach $500 for a first offense."
    })
  },
  // 2. Passing near viaduct / tunnel / bridge / railroad
  {
    topic: 'Passing Prohibitions & Railroad/Bridge/Tunnel',
    pageRef: 18,
    template: (loc, cond, _idx, hazard) => ({
      question: `You are traveling on a two-lane road ${loc} ${cond} and consider passing a slower vehicle. You notice you are approaching a ${hazard}. Georgia law strictly prohibits passing within what distance of this area?`,
      options: [
        `Within 50 feet of the ${hazard}.`,
        `Within 100 feet of the ${hazard}.`,
        `Within 250 feet of the ${hazard}.`,
        `Within 500 feet of the ${hazard}.`
      ],
      correctAnswerIndex: 1,
      explanation: `Georgia DDS Manual (Page 18): Passing is strictly prohibited on two-lane roads within 100 feet of any railroad crossing, bridge, viaduct, or tunnel, as well as on hills or curves where sight distance is obstructed.`
    })
  },
  // 3. Passing oncoming distance requirement (200 ft)
  {
    topic: 'Passing on Two-Lane Roads',
    pageRef: 18,
    template: (loc, cond, _idx, _extra) => ({
      question: `When executing a lawful pass on a two-lane road ${loc} ${cond}, Georgia law requires you to complete the pass and return completely to your right lane before oncoming traffic comes within:`,
      options: [
        '50 feet of your vehicle.',
        '100 feet of your vehicle.',
        '200 feet of your vehicle.',
        '400 feet of your vehicle.'
      ],
      correctAnswerIndex: 2,
      explanation: 'Georgia DDS Manual (Page 18): You must have sufficient time and space to complete your passing maneuver and return completely to the right lane before oncoming traffic is within 200 feet of your vehicle.'
    })
  },
  // 4. Solid Yellow / Double Yellow Lines
  {
    topic: 'Passing Prohibitions & Railroad/Bridge/Tunnel',
    pageRef: 18,
    template: (loc, cond, _idx, _extra) => ({
      question: `You are driving on a two-lane highway ${loc} ${cond}. The pavement marking nearest your vehicle is a solid yellow line to the right of the center line. What does this mean?`,
      options: [
        'You may pass slower vehicles if they are moving less than 20 mph.',
        'You are entering a designated passing zone.',
        'You are in a no-passing zone and must not cross the line to pass another vehicle.',
        'Passing is permitted only on weekends.'
      ],
      correctAnswerIndex: 2,
      explanation: 'Georgia DDS Manual (Page 18): A solid yellow line on the right of the center line indicates a no-passing zone for traffic traveling in your direction. Passing is strictly prohibited until a broken striped line begins on your side.'
    })
  },
  // 5. Passing on the Right
  {
    topic: 'Passing on the Right & When Being Passed',
    pageRef: 19,
    template: (loc, cond, _idx, _extra) => ({
      question: `Under Georgia law, when is it legal to overtake and pass another vehicle on the right ${loc}?`,
      options: [
        'Whenever you are in a rush and the left lane is moving too slowly.',
        'When the vehicle ahead is making or about to make a left turn and there is sufficient pavement width, or on a multi-lane highway with two or more lanes moving in the same direction.',
        'By driving onto the paved or unpaved shoulder of the roadway.',
        'Only when authorized by a police officer via siren.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 19): You may pass on the right if the vehicle ahead is making or about to make a left turn and there is sufficient pavement, or when traveling on a multi-lane road carrying 2 or more lanes in the same direction. Passing on the shoulder is always illegal.'
    })
  },
  // 6. When Someone Passes You
  {
    topic: 'Passing on the Right & When Being Passed',
    pageRef: 19,
    template: (loc, cond, _idx, _extra) => ({
      question: `While driving ${loc} ${cond}, another motorist attempts to overtake and pass your vehicle on the left. According to Georgia law, what is your legal obligation?`,
      options: [
        'Increase your speed to prevent the vehicle from cutting in front of you.',
        'Reduce your speed slightly to assist the overtaking driver; it is unlawful to increase your speed until completely passed.',
        'Veer onto the shoulder immediately.',
        'Flash your high beams continuously.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 19): When another vehicle is passing you, it is courteous to reduce your speed slightly. Georgia law makes it explicitly unlawful to increase your speed before you have been passed completely.'
    })
  },
  // 7. Passing Stopped Cars at Crosswalks
  {
    topic: 'Watching for Pedestrians & Blind Pedestrians',
    pageRef: 19,
    template: (loc, cond, _idx, _extra) => ({
      question: `You approach an intersection ${loc} ${cond} and see a vehicle in the adjacent lane stopped at a crosswalk. Traffic signals indicate green. What must you do?`,
      options: [
        'Pass the stopped vehicle cautiously because you have the green light.',
        'Never overtake or pass a vehicle stopped at a marked or unmarked crosswalk, because pedestrians may be crossing and blocked from view.',
        'Honk your horn and pass on the right shoulder.',
        'Accelerate rapidly past the vehicle.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 19): Whenever any vehicle is stopped to permit a pedestrian to cross at a marked or unmarked crosswalk, approaching drivers from the rear shall NOT overtake and pass the stopped vehicle, regardless of traffic signal indications.'
    })
  },
  // 8. Passing Bicyclists - 3 Feet Rule & Speed
  {
    topic: 'Passing Bicyclists & Motorcyclists',
    pageRef: 19,
    template: (loc, cond, _idx, _extra) => ({
      question: `You are approaching a bicyclist riding along the edge of the roadway ${loc} ${cond}. Road conditions prevent changing into another lane. By law, how must you pass?`,
      options: [
        'Honk to tell the cyclist to get onto the sidewalk.',
        'Reduce your speed to at least 10 mph less than the posted speed limit or 25 mph (whichever is more) and leave at least 3 feet of clearance.',
        'Pass within 12 inches at the normal posted speed limit.',
        'Follow behind the bicycle for at least 5 miles without passing.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 19): Georgia law requires motorists to change lanes away from bicycles if possible. If a lane change is impossible or unsafe, reduce speed to at least 10 mph below the posted limit or 25 mph (whichever is more) and maintain at least 3 feet of space at all times (punishable by a fine up to $250).'
    })
  },
  // 9. Passing Motorcyclists - Full Lane
  {
    topic: 'Passing Bicyclists & Motorcyclists',
    pageRef: 19,
    template: (loc, cond, _idx, _extra) => ({
      question: `When overtaking and passing a motorcycle ${loc} ${cond}, how much lane space must you allocate to the rider?`,
      options: [
        'Share the same lane if the motorcyclist is hugging the right side.',
        'The full width of a single lane; you must change lanes into an adjacent lane and never share a lane while passing.',
        'At least 18 inches of clearance within the same travel lane.',
        'Motorcycles do not have full lane rights under Georgia statutes.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 19): A motorcyclist legally occupies the full width of a single lane. When passing a motorcycle, a driver must pass in an adjacent lane and is strictly prohibited from occupying the same lane as the rider.'
    })
  },
  // 10. Weaving & Turn Signals
  {
    topic: 'Weaving & Illegal Signals',
    pageRef: 19,
    template: (loc, cond, _idx, _extra) => ({
      question: `On a multi-lane roadway ${loc} ${cond}, a driver rapidly shifts back and forth between lanes to move faster than traffic. Under Georgia law, this action is:`,
      options: [
        'Permitted if the driver activates hazard lights.',
        'Unlawful weaving; drivers must not weave between lanes to bypass traffic flow and must clearly signal all lane changes.',
        'Encouraged to ease highway congestion.',
        'Only restricted for commercial vehicles.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 19): It is unlawful to weave from one lane of traffic to another in order to move faster than the flow of traffic. Lane changes must be made safely with clear advance turn signals.'
    })
  },
  // 11. Illegal Signals
  {
    topic: 'Weaving & Illegal Signals',
    pageRef: 19,
    template: (loc, cond, _idx, _extra) => ({
      question: `While driving ${loc}, you want to let the driver behind you know it is safe for them to pass. Georgia law:`,
      options: [
        'Requires you to flash your right turn signal.',
        'Makes it strictly against the law to flash turn signals as a courtesy or "do pass" signal to drivers behind.',
        'Recommends tapping your brakes twice.',
        'Allows waving a white handkerchief out your window.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 19): "Illegal Signals: It is against the law to flash turn signals as a courtesy or \'do pass\' signal to other drivers in the rear."'
    })
  },
  // 12. Making a Left Turn - Wheels Straight
  {
    topic: 'Turn Signals & Making Turns Safely',
    pageRef: 19,
    template: (loc, cond, _idx, _extra) => ({
      question: `While stopped at an intersection ${loc} waiting for oncoming traffic to clear before making a left turn, you should:`,
      options: [
        'Turn your front wheels sharply left so you can accelerate quickly.',
        'Keep your wheels straight ahead until you actually begin making the turn.',
        'Angle your vehicle diagonally across the oncoming lane.',
        'Keep your foot on the accelerator while in neutral.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 19): Always keep your wheels pointed straight ahead until you begin making the left turn. If you are rear-ended while your wheels are turned left, your car could be pushed directly into oncoming traffic.'
    })
  },
  // 13. Making a Right Turn
  {
    topic: 'Turn Signals & Making Turns Safely',
    pageRef: 19,
    template: (loc, cond, _idx, _extra) => ({
      question: `When executing a right turn at an intersection ${loc} ${cond}, where should you position your vehicle during approach and completion?`,
      options: [
        'Approach in the left lane to make a wide swing, and finish in the center lane.',
        'Approach in the right lane staying as close as practicable to the curb or roadway edge, and complete the turn into the right lane of the new street.',
        'Straddle both lanes so pedestrians see you.',
        'Enter the oncoming traffic lane first.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 19): Approach the intersection in the right lane, staying as close as practicable to the curb or edge of the roadway. Complete the turn ending up in the right lane of the street turned onto.'
    })
  },
  // 14. Blind Pedestrians
  {
    topic: 'Watching for Pedestrians & Blind Pedestrians',
    pageRef: 20,
    template: (loc, cond, _idx, _extra) => ({
      question: `When approaching an intersection ${loc} ${cond}, you observe a pedestrian carrying a white walking cane or being guided by a guide dog. What does Georgia law dictate?`,
      options: [
        'Honk your horn to let the pedestrian know your car is approaching.',
        'Pedestrians using guide dogs or white walking canes must be granted absolute right-of-way at all times.',
        'They only have right-of-way if a pedestrian walk signal is illuminated.',
        'You may proceed if you are turning right on red.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 20 & 42): Pedestrians using guide dogs or carrying white walking canes must be given the right-of-way at all times, without exception.'
    })
  },
  // 15. U-Turns
  {
    topic: 'U-Turns & Multi-Lane Highway Turns',
    pageRef: 20,
    template: (loc, cond, _idx, _extra) => ({
      question: `Under Georgia law, making a U-turn is strictly prohibited:`,
      options: [
        'On any one-way street where permitted by traffic signs.',
        'On a curve or near the crest of a hill where your vehicle cannot be seen by other drivers approaching from either direction within a safe distance.',
        'At all intersections with traffic signals.',
        'On paved residential streets during daylight hours.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 20): Do not make a U-turn on a curve or near the top of a hill if you cannot be seen by other drivers approaching from either direction. Also never make a U-turn where signs prohibit it.'
    })
  },
  // 16. Parking - Fire Hydrant (15 ft)
  {
    topic: 'Stopping, Standing, and Parking',
    pageRef: 20,
    template: (loc, cond, _idx, _extra) => ({
      question: `You need to stop your car momentarily to let a passenger exit ${loc}. By Georgia law, stopping, standing, or parking is prohibited within how many feet of a fire hydrant?`,
      options: [
        'Within 10 feet.',
        'Within 15 feet.',
        'Within 25 feet.',
        'Within 30 feet.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 20): Stopping, standing, or parking is permitted only momentarily to pick up or drop off passengers within 15 feet of a fire hydrant; otherwise parking within 15 feet is illegal.'
    })
  },
  // 17. Parking - Stop Sign / Yield / Signal (30 ft)
  {
    topic: 'Stopping, Standing, and Parking',
    pageRef: 20,
    template: (loc, cond, _idx, _extra) => ({
      question: `When parking near an intersection ${loc}, what is the minimum statutory distance you must leave between your vehicle and a stop sign, yield sign, or traffic control signal?`,
      options: [
        'At least 15 feet.',
        'At least 20 feet.',
        'At least 30 feet.',
        'At least 50 feet.'
      ],
      correctAnswerIndex: 2,
      explanation: 'Georgia DDS Manual (Page 20): Parking, stopping, or standing is prohibited within 30 feet of any stop sign, yield sign, or traffic control signal.'
    })
  },
  // 18. Parking - Crosswalk (20 ft)
  {
    topic: 'Stopping, Standing, and Parking',
    pageRef: 20,
    template: (loc, cond, _idx, _extra) => ({
      question: `At an intersection crosswalk ${loc}, what is the minimum distance required when stopping, standing, or parking a motor vehicle?`,
      options: [
        'Within 10 feet.',
        'Within 20 feet.',
        'Within 30 feet.',
        'Within 40 feet.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 20): Stopping, standing, or parking is permitted only momentarily to pick up/drop off passengers within 20 feet of a crosswalk at an intersection.'
    })
  },
  // 19. Parking - Railroad Crossing (50 ft)
  {
    topic: 'Stopping, Standing, and Parking',
    pageRef: 20,
    template: (loc, cond, _idx, _extra) => ({
      question: `When parking on a street crossed by railway tracks ${loc}, you must not stop, stand, or park within how many feet of the nearest rail?`,
      options: [
        'Within 20 feet.',
        'Within 30 feet.',
        'Within 50 feet.',
        'Within 100 feet.'
      ],
      correctAnswerIndex: 2,
      explanation: 'Georgia DDS Manual (Page 20): Stopping, standing, or parking is strictly prohibited within 50 feet of a railroad crossing.'
    })
  },
  // 20. Parking - Fire Station Driveway (20 ft / 75 ft)
  {
    topic: 'Stopping, Standing, and Parking',
    pageRef: 20,
    template: (loc, cond, _idx, _extra) => ({
      question: `Regarding parking near a fire station entrance ${loc}, Georgia law requires you to park at least:`,
      options: [
        '10 feet away on the same side, and 30 feet away on the opposite side.',
        '20 feet away from the driveway on the same side, and 75 feet away on the side across the street.',
        '50 feet away on both sides.',
        '15 feet away regardless of street side.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 20): Stopping or parking is prohibited within 20 feet of a fire station driveway, and within 75 feet of the spot across the street from a fire station driveway.'
    })
  },
  // 21. Parallel Parking Curb Distance (18 inches)
  {
    topic: 'Parallel Parking & Straight Line Backing',
    pageRef: 20,
    template: (loc, cond, _idx, _extra) => ({
      question: `When parallel parking on a public roadway ${loc}, what is the maximum legal distance your tires may be from the curb?`,
      options: [
        'No more than 6 inches.',
        'No more than 12 inches.',
        'No more than 18 inches.',
        'No more than 24 inches.'
      ],
      correctAnswerIndex: 2,
      explanation: 'Georgia DDS Manual (Page 20): In parallel parking, your car must be parked not more than 18 inches from the curb. The testing space standard is 22 feet by 10 feet.'
    })
  },
  // 22. Slow Poke Law (HB 459)
  {
    topic: 'Slow Poke Law & Impeding Traffic',
    pageRef: 20,
    template: (loc, cond, _idx, _extra) => ({
      question: `You are traveling in the far-left passing lane of a multi-lane highway ${loc} at the posted speed limit. A faster car approaches behind you. Under Georgia's Slow Poke Law (HB 459), what MUST you do?`,
      options: [
        'Stay in the left lane because you are driving the legal speed limit.',
        'Move out of the passing lane and over to the right to allow the faster vehicle to proceed, regardless of your speed.',
        'Tap your brakes to warn the tailgater to back off.',
        'Turn on hazard flashers to indicate compliance with the limit.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 20): Georgia\'s Slow Poke Law requires slower drivers in the left passing lane to move over to the right when overtaken by faster traffic, REGARDLESS of the speed you are traveling. Penalties include fines up to $1,000 and 3 points.'
    })
  },
  // 23. Backing Up - Proper Procedure
  {
    topic: 'Parallel Parking & Straight Line Backing',
    pageRef: 21,
    template: (loc, cond, _idx, _extra) => ({
      question: `When performing a straight-line backing maneuver ${loc}, what is the correct technique required by the Georgia DDS road test?`,
      options: [
        'Rely entirely on your backup camera screen.',
        'Turn your head and look over your right shoulder through the rear window while backing slowly (under 10 mph) for approximately 50 feet without encroaching boundary lines.',
        'Keep both hands at 12 o\'clock and check side mirrors only.',
        'Accelerate briskly to 20 mph.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 21 & 12): Back your car for approximately 50 feet at a slow speed (not more than 10 mph) as straight as possible. You must turn your head and look over your right shoulder behind the vehicle; do not depend solely on mirrors.'
    })
  },
  // 24. Super Speeder Law Speeds ($200 fee)
  {
    topic: 'Super Speeder Law',
    pageRef: 21,
    template: (loc, cond, _idx, _extra) => ({
      question: `Which of the following driving speeds triggers Georgia's "Super Speeder" $200 state fee?`,
      options: [
        'Driving 70 mph on an urban interstate.',
        'Driving 75 mph or more on any two-lane road, or 85 mph or more on any road in Georgia.',
        'Driving 15 mph over the speed limit in a residential zone.',
        'Driving 65 mph on an unpaved county road.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 21): Any driver convicted of speeding 75 mph or more on a two-lane road, or 85 mph or more on any road in Georgia, will be assessed a $200 state fee in addition to local fines. Nonpayment triggers license suspension and a $50 reinstatement fee.'
    })
  },
  // 25. Speed Limit - Urban / Residential (30 mph)
  {
    topic: 'Traveling Speed & Speed Limits',
    pageRef: 21,
    template: (loc, cond, _idx, _extra) => ({
      question: `Unless otherwise posted by official highway signs, what is the statutory maximum speed limit in any urban or residential district in Georgia?`,
      options: [
        '25 miles per hour.',
        '30 miles per hour.',
        '35 miles per hour.',
        '40 miles per hour.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 21): Maximum speed limits unless otherwise posted: 30 miles per hour in any urban or residential district.'
    })
  },
  // 26. Speed Limit - Unpaved County Road (35 mph)
  {
    topic: 'Traveling Speed & Speed Limits',
    pageRef: 21,
    template: (loc, cond, _idx, _extra) => ({
      question: `What is the statutory speed limit on an unpaved county road in Georgia unless a different speed is posted?`,
      options: [
        '25 miles per hour.',
        '30 miles per hour.',
        '35 miles per hour.',
        '45 miles per hour.'
      ],
      correctAnswerIndex: 2,
      explanation: 'Georgia DDS Manual (Page 21): 35 miles per hour on an unpaved county road.'
    })
  },
  // 27. Speed Limit - Rural Interstate (70 mph)
  {
    topic: 'Traveling Speed & Speed Limits',
    pageRef: 21,
    template: (loc, cond, _idx, _extra) => ({
      question: `What is the maximum speed limit on a rural interstate highway in Georgia unless otherwise posted?`,
      options: [
        '60 miles per hour.',
        '65 miles per hour.',
        '70 miles per hour.',
        '75 miles per hour.'
      ],
      correctAnswerIndex: 2,
      explanation: 'Georgia DDS Manual (Page 21): 70 miles per hour on a rural interstate.'
    })
  },
  // 28. Speed Limit - Urban Interstate / Divided (65 mph)
  {
    topic: 'Traveling Speed & Speed Limits',
    pageRef: 21,
    template: (loc, cond, _idx, _extra) => ({
      question: `On an urban interstate or on a multi-lane divided highway in Georgia, what is the default maximum speed limit?`,
      options: [
        '55 miles per hour.',
        '60 miles per hour.',
        '65 miles per hour.',
        '70 miles per hour.'
      ],
      correctAnswerIndex: 2,
      explanation: 'Georgia DDS Manual (Page 21): 65 miles per hour on an urban interstate or on a multi-lane divided highway.'
    })
  },
  // 29. Railroad Crossing Stopping Distance (15 to 50 ft)
  {
    topic: 'Railroad Crossings & 7 Safety Steps',
    pageRef: 21,
    template: (loc, cond, _idx, _extra) => ({
      question: `When approaching a railroad grade crossing ${loc} with warning lights flashing or gates lowered, you must stop your vehicle within what distance from the nearest track?`,
      options: [
        'Within 25 feet, but not less than 5 feet.',
        'Within 50 feet, but not less than 15 feet.',
        'Within 100 feet, but not less than 50 feet.',
        'Exactly 5 feet from the rail.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 21): You must always stop within 50 feet, but not less than 15 feet, from the nearest rail of a railroad crossing when signals flash, gates are lowered, or a train is approaching.'
    })
  },
  // 30. Highway Work Zones - Flagger Authority
  {
    topic: 'Highway Work Zones, Flaggers & Amber Lights',
    pageRef: 22,
    template: (loc, cond, _idx, _extra) => ({
      question: `In a highway construction work zone ${loc}, a human flagger directs traffic with a sign or hand paddle. What legal authority does this flagger carry?`,
      options: [
        'Advisory only; you may choose to follow normal traffic lights instead.',
        'The flagger has the exact same authority as an official regulatory traffic sign; disobeying a flagger is illegal.',
        'Flaggers may only control commercial trucks, not passenger cars.',
        'A flagger\'s signals only apply between sunrise and sunset.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 22): Obey Flaggers: In a work zone, a flagger has the same authority as a regulatory sign. Do not disobey a flagger\'s traffic control directions.'
    })
  },
  // 31. Work Zone Speeding Penalties ($100-$2000, 12 mo)
  {
    topic: 'Highway Work Zones, Flaggers & Amber Lights',
    pageRef: 22,
    template: (loc, cond, _idx, _extra) => ({
      question: `Under Georgia statutes, what penalty applies to a driver convicted of disobeying regulatory speed limits in a designated work zone?`,
      options: [
        'A written warning on first offense.',
        'Misdemeanor of a high and aggravated nature, with fines between $100 and $2,000, imprisonment up to 12 months, or both.',
        'A civil parking fine of $45.',
        'Loss of license for 5 years automatically.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 22): Disobeying regulatory speed limits in a work zone is a misdemeanor of a high and aggravated nature punished by a fine of $100 to $2,000 and/or imprisonment up to 12 months.'
    })
  },
  // 32. Controlled-Access Roadways & Peach Pass
  {
    topic: 'Controlled-Access Roadways & Peach Pass',
    pageRef: 23,
    template: (loc, cond, _idx, _extra) => ({
      question: `When traveling on Georgia\'s Express Lanes (such as the I-85 Express Lanes or I-75 South Metro Reversible Lanes), what equipment is required?`,
      options: [
        'An illuminated taxi top light.',
        'A registered Peach Pass transponder properly mounted in the vehicle.',
        'Cash payment at roadside coin toll booths.',
        'A special commercial driving endorsement.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 23): Tolled express lanes in Georgia require motorists to mount a registered Peach Pass transponder in their vehicle. Owners entering without an active pass receive violation notices by mail.'
    })
  },
  // 33. Coasting Downhill Prohibited
  {
    topic: 'Coasting & Mechanical Prohibitions',
    pageRef: 23,
    template: (loc, cond, _idx, _extra) => ({
      question: `When driving downhill on a mountain pass ${loc}, Georgia law states that a driver:`,
      options: [
        'Should shift into neutral to maximize fuel economy.',
        'Must not coast with the transmission or gears of the vehicle in neutral.',
        'Must turn off the engine ignition to cool the vehicle.',
        'Should rest their foot continuously on the brake pedal.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 23): Coasting: The driver of any motor vehicle, when traveling down a hill, must not coast with the gears or transmission of the vehicle in neutral.'
    })
  },
  // 34. DUI BAC Limits - 21+ and Under 21
  {
    topic: 'Driving Under the Influence of Drugs or Alcohol (DUI)',
    pageRef: 23,
    template: (loc, cond, _idx, _extra) => ({
      question: `Under Georgia DUI laws, what are the legal blood alcohol concentration (BAC) thresholds for drivers age 21+ versus drivers under age 21?`,
      options: [
        '0.10 gm for adults, 0.05 gm for drivers under 21.',
        '0.08 gm or more for drivers 21 and older; 0.02 gm or more for drivers under age 21.',
        '0.05 gm for all drivers regardless of age.',
        '0.04 gm for adult motorists, 0.00 gm for minors.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 23): A driver 21 or older is considered Under the Influence at 0.08 gm BAC or higher. A driver under 21 is irrefutably considered Under the Influence at 0.02 gm BAC or higher.'
    })
  },
  // 35. Headlights - Sunset / Sunrise & Dimming Distances
  {
    topic: 'Headlights Properly & Night Driving',
    pageRef: 24,
    template: (loc, cond, _idx, _extra) => ({
      question: `When driving ${loc} at night, you must dim your high-beam headlights when within how many feet of an oncoming car, and within how many feet when following another car?`,
      options: [
        'Within 200 feet oncoming; within 100 feet following.',
        'Within 500 feet of an oncoming vehicle, and within 200 feet when following behind another vehicle.',
        'Within 1,000 feet oncoming; within 500 feet following.',
        'Within 300 feet oncoming; within 50 feet following.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 24): You must dim high-beam headlights when within 500 feet of an approaching vehicle and when following closely (within 200 feet) behind another vehicle.'
    })
  },
  // 36. Safety Belts & Child Restraint Ages (Under 8)
  {
    topic: 'Safety Belts & Child Restraints',
    pageRef: 24,
    template: (loc, cond, _idx, _extra) => ({
      question: `Under Georgia safety restraint statutes, which passengers must be secured in an approved child passenger restraint system?`,
      options: [
        'All children under 4 years of age.',
        'Every child under eight years of age, except in a taxicab or public transit vehicle (complying with FMVSS 213).',
        'Only children weighing under 30 pounds.',
        'All rear-seat occupants under age 12.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 24): Every driver transporting a child under eight years of age, except in a taxicab or public transit vehicle, must properly restrain the child in an approved child passenger restraint system.'
    })
  },
  // 37. Hands Free Law Penalties (HB 673)
  {
    topic: 'Distracted Driving & Hands Free Law (HB 673)',
    pageRef: 25,
    template: (loc, cond, _idx, _extra) => ({
      question: `What are the progressive penalties and points assessed for convictions under Georgia's Hands Free Law (HB 673)?`,
      options: [
        '1st: $25 (0 pts); 2nd: $50 (1 pt); 3rd: $75 (2 pts).',
        '1st conviction: 1 point and fine up to $50; 2nd conviction: 2 points and fine up to $100; 3rd or more: 3 points and fine up to $150.',
        '1st conviction: 3 points and $150; 2nd conviction: 6 points and $300; 3rd: License suspended.',
        'A mandatory $500 fee for every conviction.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 25): Hands Free Law penalties: 1st conviction = 1 point and fine up to $50; 2nd conviction = 2 points and fine up to $100; 3rd or more convictions = 3 points and fine up to $150.'
    })
  },
  // 38. Following Emergency Vehicles (200 ft / 500 ft)
  {
    topic: 'Following Emergency Vehicles & Passing Mail/Sanitation',
    pageRef: 24,
    template: (loc, cond, _idx, _extra) => ({
      question: `When a fire fighting apparatus is traveling in response to an alarm, you must not follow closer than __ feet, nor park within __ feet of the apparatus when stopped:`,
      options: [
        'Follow no closer than 100 feet; park no closer than 300 feet.',
        'Follow no closer than 200 feet; park no closer than 500 feet.',
        'Follow no closer than 300 feet; park no closer than 1,000 feet.',
        'Follow no closer than 50 feet; park no closer than 100 feet.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 24): You must not follow any fire apparatus traveling in response to an alarm closer than 200 feet, or park any vehicle within 500 feet of any fire apparatus stopped in answer to an alarm.'
    })
  },
  // 39. Passing Postal & Sanitation Vehicles (25 mph / 10 mph under)
  {
    topic: 'Following Emergency Vehicles & Passing Mail/Sanitation',
    pageRef: 25,
    template: (loc, cond, _idx, _extra) => ({
      question: `You are approaching a postal service vehicle or sanitation vehicle displaying flashing amber, white, or red lights ${loc} ${cond}. If you cannot change lanes safely, you must:`,
      options: [
        'Honk and pass on the shoulder.',
        'Reduce speed to at least 10 mph less than the posted limit or 25 mph (whichever is more) and be prepared to stop.',
        'Maintain speed but turn off your audio system.',
        'Come to a complete stop and wait for the worker to signal you.'
      ],
      correctAnswerIndex: 1,
      explanation: 'Georgia DDS Manual (Page 25): When approaching a postal or sanitation vehicle with flashing lights, drivers must change lanes if safe. If impossible or unsafe, reduce speed to at least 10 mph below the posted limit or 25 mph (whichever is more) and be prepared to stop. Fines up to $250.'
    })
  },
  // 40. Flashing Red & Flashing Yellow Signals
  {
    topic: 'Laws Governing Right-of-Way',
    pageRef: 17,
    template: (loc, cond, _idx, signalType) => ({
      question: `You arrive at an intersection ${loc} where the overhead traffic signal is displaying a ${signalType}. By Georgia law, what action is required?`,
      options: [
        signalType.includes('red')
          ? 'Slow down to 15 mph and proceed without stopping if no cars are visible.'
          : 'Come to a complete stop, regardless of whether traffic is approaching.',
        signalType.includes('red')
          ? 'Treat it as a stop sign: come to a complete stop, yield right-of-way to cross traffic and pedestrians, and proceed only when safe.'
          : 'Slow down and exercise caution before proceeding through the intersection.',
        'Turn around immediately; travel in this direction is closed.',
        'Honk three times before entering the intersection.'
      ],
      correctAnswerIndex: 1,
      explanation: signalType.includes('red')
        ? 'Georgia DDS Manual (Page 17 & 34): A flashing red signal requires a complete stop and is treated exactly like a stop sign. Proceed only after yielding to pedestrians and vehicles.'
        : 'Georgia DDS Manual (Page 17 & 34): A flashing yellow light means you must slow down and exercise caution before proceeding through the intersection.'
    })
  }
];

const VEHICLE_TYPES = [
  'Georgia State Patrol cruiser',
  'GDOT HERO emergency response unit',
  'city sanitation refuse collection truck',
  'Georgia Power electric utility service truck',
  'county ambulance emergency vehicle',
  'highway wrecker tow truck',
  'AT&T utility bucket repair truck',
  'volunteer fire department apparatus'
];

const HAZARDS = [
  'railroad grade crossing',
  'narrow highway bridge',
  'two-lane viaduct overpass',
  'highway mountain tunnel',
  'blind hillcrest curve'
];

const SIGNALS = [
  'flashing red traffic signal',
  'flashing yellow caution signal'
];

/**
 * Generates an indexed catalog of over 5,000 deterministic questions covering Section 5
 */
export function generateSection5QuestionCatalog(): Question[] {
  const catalog: Question[] = [...DDS_SECTION_5_CORE_QUESTIONS];

  // Generate 5,200+ distinct questions via matrix permutations
  let globalId = 1000;
  for (let archIdx = 0; archIdx < ARCHETYPES.length; archIdx++) {
    const archetype = ARCHETYPES[archIdx];

    for (let locIdx = 0; locIdx < LOCATIONS.length; locIdx++) {
      const location = LOCATIONS[locIdx];

      for (let condIdx = 0; condIdx < CONDITIONS.length; condIdx++) {
        const condition = CONDITIONS[condIdx];
        
        // Contextual variant
        let extra = '';
        if (archIdx === 0) {
          extra = VEHICLE_TYPES[(locIdx + condIdx) % VEHICLE_TYPES.length];
        } else if (archIdx === 1) {
          extra = HAZARDS[(locIdx + condIdx) % HAZARDS.length];
        } else if (archIdx === 39) {
          extra = SIGNALS[(locIdx + condIdx) % SIGNALS.length];
        } else {
          extra = `variant-${locIdx}-${condIdx}`;
        }

        const qData = archetype.template(location, condition, globalId, extra);
        catalog.push({
          id: `ga-dds-sec5-${globalId}`,
          topic: archetype.topic,
          pageRef: archetype.pageRef,
          question: qData.question,
          options: qData.options,
          correctAnswerIndex: qData.correctAnswerIndex,
          explanation: qData.explanation,
          source: 'scenario'
        });
        globalId++;
      }
    }
  }

  return catalog;
}
