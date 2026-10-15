import { Question } from '../types/quiz';

export const DDS_SECTION_5_CORE_QUESTIONS: Question[] = [
  // --- 20 Official Georgia DDS Practice Exam Questions ---
  {
    id: 'sec5-official-001',
    topic: 'Laws Governing Right-of-Way',
    pageRef: 19,
    question: 'You are driving on a highway divided by a physical median strip. A school bus stops on the opposite side of the median and activates its red flashing lights and extended stop sign. What does Georgia law require you to do?',
    options: [
      'You must come to a complete stop until the bus retracts its stop sign.',
      'You must slow down to 10 mph and blow your horn to warn pedestrians.',
      'You are not required to stop, but you must remain attentive for children crossing.',
      'You must stop only if you see children actively touching the pavement.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 19, "Laws Governing Right-of-Way"): "On a highway divided by a median, cars traveling on the opposite side from the stopped school bus are not required to stop, however drivers should remain attentive for children walking along or crossing the roadway."'
  },
  {
    id: 'sec5-official-002',
    topic: 'Laws Governing Right-of-Way',
    pageRef: 34,
    question: "If an intersection's traffic signal is completely dark or non-functioning due to a power failure, how must you legally handle the intersection?",
    options: [
      'Proceed through without stopping if you are traveling on the wider roadway.',
      'Treat the intersection as if a stop sign is posted for all directions.',
      'Slow down to 15 mph and yield to the vehicle on your left.',
      'Wait on the side of the road until a law enforcement officer arrives.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 34, "Traffic Signals and Signs"): "If a traffic signal is not functioning at all at an intersection, all drivers must treat the intersection as if a stop sign is posted for all directions."'
  },
  {
    id: 'sec5-official-003',
    topic: 'Laws Governing Right-of-Way',
    pageRef: 34,
    question: 'You are approaching a malfunctioning traffic signal that is flashing a red light. What is your legal obligation?',
    options: [
      'Slow down and proceed with caution without stopping.',
      'Stop completely, then proceed with caution only after yielding right-of-way.',
      'Maintain your speed because flashing red means you have the dynamic right-of-way.',
      'Make an immediate U-turn to find an alternate route.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 34, "Traffic Signals and Signs"): "A red flashing light means you must stop completely (treat as you would a stop sign). Proceed with caution only after yielding the right-of-way to pedestrians and to other vehicles at the intersection."'
  },
  {
    id: 'sec5-official-004',
    topic: 'Passing Prohibitions & Railroad/Bridge/Tunnel',
    pageRef: 19,
    question: 'Georgia law explicitly prohibits passing another vehicle on a two-lane road within how many feet of a bridge, viaduct, or tunnel?',
    options: [
      'Within 50 feet.',
      'Within 100 feet.',
      'Within 200 feet.',
      'Within 300 feet.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 19, "Passing is prohibited on two-lane roads"): "Within 100 feet of a bridge, viaduct or tunnel."'
  },
  {
    id: 'sec5-official-005',
    topic: 'Passing on Two-Lane Roads',
    pageRef: 19,
    question: 'You are passing another vehicle on a two-lane road. When are you legally allowed to cut back into the right-hand lane?',
    options: [
      "As soon as your rear bumper clears the other vehicle's front bumper.",
      "When you can see the car you just passed in your side-view mirror.",
      "When you can see the car you just passed in your rear-view mirror.",
      "Once you have traveled 100 feet past the overtaken vehicle."
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 19, "How To Pass On A Two-Lane Road"): "Pass on the left and do not return to the right lane until your vehicle is safely clear of the overtaken vehicle. Wait until you can see the car you have just passed in your rear view mirror."'
  },
  {
    id: 'sec5-official-006',
    topic: 'Passing on the Right & When Being Passed',
    pageRef: 20,
    question: 'When a vehicle behind you initiates a lawful passing maneuver, what is considered a courteous and legal action for you to take?',
    options: [
      'Accelerate slightly to help them clear your vehicle faster.',
      'Reduce your speed slightly to make it easier for them to pass.',
      'Shift your vehicle onto the right shoulder of the road.',
      'Maintain your exact speed and activate your hazard lights.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 20, "When Someone Passes You"): "It is considered courteous to reduce your speed slightly, making it easier for the other vehicle to pass you. It is unlawful to increase your speed before you have been passed completely by the overtaking vehicle."'
  },
  {
    id: 'sec5-official-007',
    topic: 'Passing Bicyclists & Motorcyclists',
    pageRef: 20,
    question: 'If you cannot safely make a full lane change to pass a bicycle rider, you must reduce your vehicle speed to at least how many miles per hour less than the posted speed limit?',
    options: [
      '5 miles per hour less.',
      '10 miles per hour less.',
      '15 miles per hour less.',
      '20 miles per hour less.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 20, "Passing Bicycles"): "Reduce the speed of the motor vehicle to a reasonable and proper speed... which speed shall be at least ten miles per hour less than the posted speed limit or 25 miles per hour, whichever is more."'
  },
  {
    id: 'sec5-official-008',
    topic: 'Passing Bicyclists & Motorcyclists',
    pageRef: 20,
    question: 'When passing a bicycle, what is the absolute minimum legal clearance distance you must maintain between your vehicle and the bicycle at all times?',
    options: [
      '2 feet.',
      '3 feet.',
      '5 feet.',
      '6 feet.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 20, "Passing Bicycles"): "Proceed around the bicycle with at least three feet between the vehicle and the bicycle at all times (punishable by a fine up to $250.00)."'
  },
  {
    id: 'sec5-official-009',
    topic: 'Passing Bicyclists & Motorcyclists',
    pageRef: 20,
    question: 'When passing a motorcyclist traveling in your direction on a multi-lane highway, how must you execute the pass?',
    options: [
      'You may share the lane with the motorcycle if there is room.',
      'You must pass completely in an adjacent lane and never occupy the same lane.',
      'You must sound your horn before entering their lane space.',
      'You are prohibited from passing a motorcycle from behind.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 20, "Passing Motorcyclists"): "When passing a motorcyclist, a driver must pass in an adjacent lane. Drivers are not permitted to occupy the same lane as a motorcyclist while passing them."'
  },
  {
    id: 'sec5-official-010',
    topic: 'Turn Signals & Making Turns Safely',
    pageRef: 19,
    question: "What is the standard restriction regarding your vehicle's tires when waiting to execute a left turn at a busy intersection?",
    options: [
      'Keep your wheels turned sharply to the left.',
      'Keep your wheels turned sharply to the right to look for pedestrians.',
      'Keep your wheels straight until you actually begin making the turn.',
      'Keep your vehicle slowly creeping forward continuously.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 19, "How To Make A Left Turn"): "Keep your wheels straight until you begin making the turn."'
  },
  {
    id: 'sec5-official-011',
    topic: 'Slow Poke Law & Impeding Traffic',
    pageRef: 20,
    question: 'Under Georgia\'s "Slow Poke" Law (HB 459), when driving on a multi-lane highway, what must a slower driver do when a faster-moving vehicle approaches from behind in the left lane?',
    options: [
      'Maintain their speed if they are driving exactly at the posted speed limit.',
      'Move out of the passing lane and over to the right, regardless of their current speed.',
      'Tap their brakes twice to warn the faster driver to slow down.',
      'Activate their hazard lights to indicate they are a slower vehicle.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 20, "The Slow Poke Law"): "Slower drivers must move out of the passing lane (most left-hand lanes) and over to the right to allow faster-moving traffic to proceed. Regardless of the speed you are traveling, you must move from the lane when faster traffic is approaching."'
  },
  {
    id: 'sec5-official-012',
    topic: 'Parallel Parking & Straight Line Backing',
    pageRef: 20,
    question: 'When attempting to parallel park along a curb, approximately how far away should you initially align your vehicle door-to-door from the parked car ahead of the empty space?',
    options: [
      '1 foot.',
      '2 feet.',
      '4 feet.',
      '5 feet.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 20, "Steps to Parallel Parking"): "Stop when you are approximately even with the car ahead of the space (you should be approximately 2 feet from the other car-door to door)."'
  },
  {
    id: 'sec5-official-013',
    topic: 'Stopping, Standing, and Parking',
    pageRef: 20,
    question: 'According to the structural guidelines in Section 5, you are completely prohibited from stopping, standing, or parking a vehicle within how many feet of a railroad crossing?',
    options: [
      'Within 15 feet.',
      'Within 30 feet.',
      'Within 50 feet.',
      'Within 75 feet.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 20, "Stopping, Standing, and Parking"): "Stopping, standing, or parking is permitted only momentarily to pick up or drop off passengers within 50 feet of a railroad crossing."'
  },
  {
    id: 'sec5-official-014',
    topic: 'Traveling Speed & Speed Limits',
    pageRef: 22,
    question: 'Unless otherwise posted, what is the maximum statutory speed limit permitted on an unpaved county road in the state of Georgia?',
    options: [
      '25 miles per hour.',
      '30 miles per hour.',
      '35 miles per hour.',
      '45 miles per hour.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 22, "Speed Limits"): "35 miles per hour on an unpaved county road."'
  },
  {
    id: 'sec5-official-015',
    topic: 'Railroad Crossings & 7 Safety Steps',
    pageRef: 22,
    question: 'You are approaching a highway-rail grade crossing. You must bring your vehicle to a complete stop within how many feet from the nearest rail if the signal is actively flashing?',
    options: [
      'Within 30 feet, but not less than 10 feet.',
      'Within 50 feet, but not less than 15 feet.',
      'Within 75 feet, but not less than 20 feet.',
      'Exactly 100 feet back from the tracks.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 22, "Railroad Crossings"): "You must always stop within 50 feet, but not less than 15 feet, from the nearest rail of a railroad crossing when the signal is flashing, crossing gates are lowered, or a train is approaching."'
  },
  {
    id: 'sec5-official-016',
    topic: 'Highway Work Zones, Flaggers & Amber Lights',
    pageRef: 22,
    question: 'What color background is legally designated for warning signs in highway work zones to signify active road work ahead?',
    options: [
      'Fluorescent Yellow.',
      'Bright Red.',
      'Orange.',
      'White.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 22, "Highway Work Zones"): "Warning signs in work zones have an orange background and black letters or symbols. Watch for the color orange. It means road work."'
  },
  {
    id: 'sec5-official-017',
    topic: 'Railroad Crossings & 7 Safety Steps',
    pageRef: 21,
    question: 'If your vehicle stalls directly on a railroad track and a train is approaching, what should you do immediately after exiting the vehicle?',
    options: [
      'Run down the track directly toward the oncoming train at an angle away from the tracks.',
      'Stand next to the vehicle and wave a bright cloth to alert the engineer.',
      'Try to push the car off the tracks from the rear bumper.',
      'Run along the side of the tracks in the exact same direction the train is traveling.'
    ],
    correctAnswerIndex: 0,
    explanation: 'Georgia DDS Manual (Page 21, "Railroad Crossings"): When a vehicle stalls on tracks with a train approaching, exit immediately and run toward the direction from which the train is approaching at an angle away from the tracks, so that flying debris from the collision does not hit you.'
  },
  {
    id: 'sec5-official-018',
    topic: 'Headlights Properly & Night Driving',
    pageRef: 25,
    question: 'Georgia law states you must dim (lower) your high-beam headlights when you are following closely behind another vehicle within how many feet?',
    options: [
      'Within 100 feet.',
      'Within 200 feet.',
      'Within 300 feet.',
      'Within 500 feet.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 25, "Use Headlights Properly"): "You should dim (lower) your headlights when: You are following closely (within 200 feet) behind another vehicle; You are within 500 feet of an approaching vehicle."'
  },
  {
    id: 'sec5-official-019',
    topic: 'Driving Under the Influence of Drugs or Alcohol (DUI)',
    pageRef: 24,
    question: 'For drivers who are under the age of 21, what is the blood alcohol concentration (BAC) threshold at which they are irrefutably considered to be driving under the influence (DUI) in Georgia?',
    options: [
      '0.01 gm or more.',
      '0.02 gm or more.',
      '0.04 gm or more.',
      '0.08 gm or more.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 24, "Driving Under the Influence of Drugs or Alcohol"): "A person under 21 years of age is irrefutably considered \'Under the Influence of Alcohol\' when 0.02 gm or more by alcohol weight is present in the blood."'
  },
  {
    id: 'sec5-official-020',
    topic: "Georgia's Litter Control Law",
    pageRef: 24,
    question: 'Individuals convicted under Georgia\'s Litter Control Law face property damage classifications. What is the maximum fine a judge can impose for a littering misdemeanor?',
    options: [
      'Up to $250.',
      'Up to $500.',
      'Up to $1,000.',
      'Up to $2,500.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 24, "Georgia\'s Litter Control Law"): "Persons convicted of this law may be assessed a fine up to $1000 and a 12 month jail term."'
  },
  {
    id: 'sec5-row-001',
    topic: 'Laws Governing Right-of-Way',
    pageRef: 17,
    question: 'According to Georgia law, what is the fundamental principle regarding right-of-way?',
    options: [
      'Right-of-way is something you must aggressively take if you arrive first.',
      'Right-of-way is something to be given, not taken.',
      'Drivers on state routes always have permanent absolute right-of-way.',
      'Pedestrians only have right-of-way if marked with reflective safety vests.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 17): "Vehicle drivers (including bicyclists) and pedestrians should always understand the rules related to right-of-way, and remember that right-of-way is something to be given, not taken."'
  },
  {
    id: 'sec5-row-002',
    topic: 'Laws Governing Right-of-Way',
    pageRef: 17,
    question: 'At an uncontrolled intersection where two vehicles arrive at the exact same time, who must yield?',
    options: [
      'The driver of the vehicle on the left must yield to the driver on the right.',
      'The driver of the vehicle on the right must yield to the driver on the left.',
      'The larger vehicle always has the right-of-way.',
      'The vehicle turning left has precedence over straight traffic.'
    ],
    correctAnswerIndex: 0,
    explanation: 'Georgia DDS Manual (Page 17): "At intersections where there are no stop signs, yield signs or other traffic signals, if two vehicles come to the intersection at the same time, the driver of the vehicle on the left must yield to the driver of the vehicle on the right."'
  },
  {
    id: 'sec5-row-003',
    topic: 'Laws Governing Right-of-Way',
    pageRef: 17,
    question: 'At a 4-way stop intersection, what is the proper order of proceeding?',
    options: [
      'Vehicles always proceed in clockwise order regardless of arrival time.',
      'Drivers proceed on a "first to arrive, first to proceed" basis, yielding to pedestrians and vehicles on the right if arriving simultaneously.',
      'The fastest vehicle proceeds first to prevent traffic congestion.',
      'Commercial vehicles and pickup trucks always have right-of-way.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 17): "At a four-way intersection where all drivers are faced with stop signs, all drivers must yield to pedestrians; otherwise the vehicles should proceed through the intersection in a \'first to arrive, first to proceed order.\' If two vehicles reach at approximately the same time, yield to any vehicles on your right."'
  },
  {
    id: 'sec5-row-004',
    topic: 'Laws Governing Right-of-Way',
    pageRef: 17,
    question: 'When making a left turn at an intersection or into an alley or driveway, you must yield to:',
    options: [
      'Only pedestrians on the left sidewalk.',
      'All traffic approaching from the opposite direction and pedestrians.',
      'Only vehicles that have their headlights turned on.',
      'No one, because turning vehicles have legal right-of-way.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 17): "When making a left turn at an intersection, or into an alley or driveway, yield the right-of-way to all traffic coming from the opposite direction."'
  },
  {
    id: 'sec5-row-005',
    topic: 'Laws Governing Right-of-Way',
    pageRef: 17,
    question: 'When approaching an intersection with a circular green traffic signal, you should:',
    options: [
      'Accelerate rapidly to clear the intersection before the light turns yellow.',
      'Enter immediately without looking because a green signal grants immunity.',
      'Wait until the intersection is clear of traffic or approaching traffic before entering.',
      'Honk your horn to warn turning pedestrians to stop.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 17): "At intersections with traffic control lights, wait until the intersection is clear of traffic or approaching traffic before entering. Do not proceed \'just because\' you have the green light."'
  },
  {
    id: 'sec5-row-006',
    topic: 'Laws Governing Right-of-Way',
    pageRef: 17,
    question: 'Unless a sign prohibits it, when is a "left turn on red" permitted in Georgia?',
    options: [
      'Never under any circumstances.',
      'From the left lane of a one-way street onto a one-way street where traffic moves to the left, after a complete stop.',
      'At any multi-lane intersection between 12:00 AM and 5:00 AM.',
      'Whenever traffic from the right has stopped for more than 30 seconds.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 18): "Unless a sign posted at that intersection prohibits doing so, it is permissible to make a \'left turn on red\' from the left lane of a one-way street onto a one-way street on which the traffic moves toward the driver\'s left, after a complete stop and yielding."'
  },
  {
    id: 'sec5-row-007',
    topic: 'Laws Governing Right-of-Way',
    pageRef: 17,
    question: 'When an emergency vehicle approaches with sirens and flashing red or blue lights, you must:',
    options: [
      'Speed up to clear the intersection quickly.',
      'Stop immediately in the middle of your current travel lane.',
      'Safely maneuver to the shoulder or as far to the right as possible and stop.',
      'Follow closely behind the emergency vehicle to bypass heavy traffic.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 17): "Safely maneuver your vehicle out of their way. You should slow your vehicle and move over to the shoulder of the road, or if that is not possible, as far to the right of the roadway or lane as you can, and stop."'
  },

  // --- Page 18: Move-Over Law & Passing on Two-Lane Roads ---
  {
    id: 'sec5-move-001',
    topic: "Georgia's Move-Over Law",
    pageRef: 18,
    question: "Under Georgia's Move-Over Law, what must a driver do when approaching stopped emergency, sanitation, or utility vehicles displaying flashing lights?",
    options: [
      'Maintain speed and honk the horn twice.',
      'Move over to the next lane if safely possible; if unable to move over, slow down below the speed limit and be prepared to stop.',
      'Stop completely in the travel lane until the emergency vehicle departs.',
      'Switch on high beams to illuminate the emergency personnel.'
    ],
    correctAnswerIndex: 1,
    explanation: "Georgia DDS Manual (Page 18): Georgia's Move-Over Law requires motorists to: Move over to the next lane if safely possible; If unable to move over, then slow down below the speed limit and be prepared to stop."
  },
  {
    id: 'sec5-move-002',
    topic: "Georgia's Move-Over Law",
    pageRef: 18,
    question: "What is the maximum fine for a first offense violation of Georgia's Move-Over Law?",
    options: [
      'Up to $100',
      'Up to $250',
      'Up to $500',
      'Up to $1,000'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 18): "Violations can result in a fine of no more than $500 for the first offense."'
  },
  {
    id: 'sec5-pass-001',
    topic: 'Passing on Two-Lane Roads',
    pageRef: 18,
    question: 'When passing on a two-lane road, you must return completely to the right lane before oncoming traffic is within how many feet of your vehicle?',
    options: [
      '50 feet',
      '100 feet',
      '200 feet',
      '500 feet'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 18): "You must have sufficient time and space to execute your passing maneuver and return your vehicle completely to the right lane... before oncoming traffic is within 200 feet of your vehicle."'
  },
  {
    id: 'sec5-pass-002',
    topic: 'Passing Prohibitions & Railroad/Bridge/Tunnel',
    pageRef: 18,
    question: 'Passing is prohibited on two-lane roads within how many feet of a railroad crossing, bridge, viaduct, or tunnel?',
    options: [
      'Within 50 feet',
      'Within 100 feet',
      'Within 200 feet',
      'Within 300 feet'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 18): "Passing is prohibited on two-lane roads: Within 100 feet of a railroad crossing; Within 100 feet of a bridge, viaduct or tunnel."'
  },
  {
    id: 'sec5-pass-003',
    topic: 'Passing on Two-Lane Roads',
    pageRef: 18,
    question: 'How do you know it is safe to return to the right lane after passing another vehicle?',
    options: [
      'When you can see the passed vehicle in your side mirror.',
      'When the driver behind flashes their high beams.',
      'When you can see the car you just passed clearly in your rear-view mirror.',
      'Immediately after passing the rear bumper of the vehicle.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 18): "Wait until you can see the car you have just passed in your rear view mirror before returning to the right lane."'
  },
  {
    id: 'sec5-pass-004',
    topic: 'Passing Prohibitions & Railroad/Bridge/Tunnel',
    pageRef: 18,
    question: 'On a two-lane road, passing is strictly prohibited in which of the following areas?',
    options: [
      'Where there is a broken yellow line on your side of the center line.',
      'In an area marked by a solid yellow line on the right of the center line or double yellow lines.',
      'On straight sections of rural highways with clear visibility for 2 miles.',
      'Any road with a posted speed limit over 45 mph.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 18): "Passing is prohibited on two-lane roads in areas marked by a solid yellow line on the right of the center line, or a \'Do Not Pass\' sign, or double yellow lines."'
  },
  {
    id: 'sec5-pass-005',
    topic: 'Passing Prohibitions & Railroad/Bridge/Tunnel',
    pageRef: 18,
    question: 'Is it legal to pass another vehicle by driving on the shoulder of the road in Georgia?',
    options: [
      'Yes, if the vehicle ahead is turning left.',
      'Yes, if traffic is moving under 15 mph.',
      'No, passing on the shoulder is strictly prohibited.',
      'Yes, on rural roads during daylight hours.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 19): "Passing is prohibited on the shoulder of the road under any circumstances."'
  },

  // --- Page 19: Passing on Right, Passing Stopped Cars, Bicyclists, Motorcyclists, Turns ---
  {
    id: 'sec5-pass-006',
    topic: 'Passing on the Right & When Being Passed',
    pageRef: 19,
    question: 'When is passing on the right permitted in Georgia?',
    options: [
      'Whenever the vehicle in front is driving 5 mph below the speed limit.',
      'When the vehicle being overtaken is making or about to make a left turn and there is sufficient pavement, or on multi-lane highways with 2+ lanes in the same direction.',
      'Whenever there is an unpaved shoulder wide enough for your car.',
      'Only when signaled by the driver in front.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 19): "You may pass on the right of another vehicle which is making or about to make a left turn if there is sufficient pavement width... You may also pass on the right when traveling on a multi-lane highway carrying two or more lanes of traffic in the same direction."'
  },
  {
    id: 'sec5-pass-007',
    topic: 'Passing on the Right & When Being Passed',
    pageRef: 19,
    question: 'When another vehicle is passing you, what should you do?',
    options: [
      'Increase your speed to maintain your position.',
      'Move onto the right shoulder immediately.',
      'Reduce your speed slightly and maintain your lane; it is unlawful to increase your speed before being passed completely.',
      'Honk your horn until the vehicle returns to the right lane.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 19): "It is considered courteous to reduce your speed slightly, making it easier for the other vehicle to pass you. It is unlawful to increase your speed before you have been passed completely by the overtaking vehicle."'
  },
  {
    id: 'sec5-pass-008',
    topic: 'Watching for Pedestrians & Blind Pedestrians',
    pageRef: 19,
    question: 'When a vehicle ahead of you has stopped at a crosswalk to allow a pedestrian to cross, you must:',
    options: [
      'Pass on the left if no oncoming traffic is visible.',
      'Never overtake and pass the stopped vehicle, and leave sufficient room so approaching traffic can see the crosswalk.',
      'Honk to tell the pedestrian to hurry across.',
      'Pass on the right shoulder with caution.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 19): "Whenever any vehicle is stopped to permit a pedestrian to cross the roadway... the driver of any other vehicle approaching from the rear shall not overtake and pass the stopped vehicle."'
  },
  {
    id: 'sec5-bike-001',
    topic: 'Passing Bicyclists & Motorcyclists',
    pageRef: 19,
    question: 'When passing a bicyclist in Georgia, what minimum clearance distance must motorists maintain at all times?',
    options: [
      'At least 1 foot',
      'At least 2 feet',
      'At least 3 feet',
      'At least 6 feet'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 19): "Motorists should make a lane change into a lane not adjacent to the bicycle if possible... or proceed around the bicycle with at least three feet between the vehicle and the bicycle at all times. Violation is a misdemeanor punishable by a fine up to $250.00."'
  },
  {
    id: 'sec5-bike-002',
    topic: 'Passing Bicyclists & Motorcyclists',
    pageRef: 19,
    question: 'If changing lanes to pass a bicyclist is impossible or unsafe, what speed must you reduce to?',
    options: [
      'At least 5 mph under the limit or 15 mph.',
      'At least 10 miles per hour less than the posted speed limit or 25 miles per hour, whichever is more.',
      'A complete stop until the bicyclist waves you by.',
      'The exact posted speed limit.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 19): "Reduce the speed of the motor vehicle to a reasonable and proper speed... which speed shall be at least ten miles per hour less than the posted speed limit or 25 miles per hour, whichever is more."'
  },
  {
    id: 'sec5-moto-001',
    topic: 'Passing Bicyclists & Motorcyclists',
    pageRef: 19,
    question: 'What lane space is a motorcyclist entitled to by Georgia law?',
    options: [
      'Only the right half of the lane.',
      'The full width of a single lane when traveling.',
      'Motorcycles must share lanes side-by-side with cars.',
      'Only the paved shoulder.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 19): "A motorcyclist legally occupies the full width of a single lane when traveling. When passing a motorcyclist, a driver must pass in an adjacent lane. Drivers are not permitted to occupy the same lane as a motorcyclist while passing them."'
  },
  {
    id: 'sec5-turn-001',
    topic: 'Weaving & Illegal Signals',
    pageRef: 19,
    question: 'Is it legal to flash turn signals as a courtesy or "do pass" signal to drivers behind you?',
    options: [
      'Yes, it is encouraged for truckers and slow vehicles.',
      'No, it is against the law to flash turn signals as a courtesy or "do pass" signal.',
      'Yes, only on rural two-lane highways.',
      'Yes, if hazard flashers are broken.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 19): "Illegal Signals: It is against the law to flash turn signals as a courtesy or \'do pass\' signal to other drivers in the rear."'
  },
  {
    id: 'sec5-turn-002',
    topic: 'Turn Signals & Making Turns Safely',
    pageRef: 19,
    question: 'How should you position your wheels while waiting to make a left turn at an intersection?',
    options: [
      'Turned sharply to the left so you can turn faster.',
      'Keep your wheels straight until you actually begin making the turn.',
      'Turned to the right to protect oncoming traffic.',
      'Alternating between left and right.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 19): "How To Make A Left Turn: Keep your wheels straight until you begin making the turn."'
  },
  {
    id: 'sec5-turn-003',
    topic: 'Turn Signals & Making Turns Safely',
    pageRef: 19,
    question: 'When completing a right turn from a two-way street onto another street, your vehicle must end up in:',
    options: [
      'The leftmost passing lane.',
      'The right lane of the street into which you have turned.',
      'Any open lane of your choosing.',
      'The bicycle lane.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 19): "Make the turn in such a way as to end up in the right lane of the street into which you have turned and avoid entering any other lane of traffic."'
  },

  // --- Page 20: Pedestrians, U-Turns, Stopping/Standing/Parking, Slow Poke Law ---
  {
    id: 'sec5-ped-001',
    topic: 'Watching for Pedestrians & Blind Pedestrians',
    pageRef: 20,
    question: 'At intersections with pedestrian signals, when does the pedestrian "WALK" signal typically display?',
    options: [
      'During the red light for all directions.',
      'It corresponds to the green light of the roadway you are traveling on.',
      'Only during nighttime hours.',
      'Only when traffic has completely stopped for 15 seconds.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 20): "At most intersections where there is a pedestrian signal, the \'Walk\' signal of the crossing street corresponds to the green light of the roadway you are traveling on... Therefore, before making your turn, you must stop and remain stopped for any pedestrians in the crosswalk."'
  },
  {
    id: 'sec5-uturn-001',
    topic: 'U-Turns & Multi-Lane Highway Turns',
    pageRef: 20,
    question: 'Where is making a U-turn strictly prohibited by Georgia law?',
    options: [
      'On any four-lane street.',
      'On a curve or near the top of a hill if you cannot be seen by other drivers approaching from either direction, or where prohibited by signs.',
      'At any signalized intersection.',
      'Within city limits.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 20): "Do not make a U-turn on a curve or near the top of a hill if you cannot be seen by other drivers approaching from either direction. Do not make a U-turn where signs prohibit doing so."'
  },
  {
    id: 'sec5-park-001',
    topic: 'Stopping, Standing, and Parking',
    pageRef: 20,
    question: 'How far from a fire hydrant is stopping, standing, or parking permitted only momentarily to pick up or drop off passengers?',
    options: [
      'Beyond 10 feet',
      'Beyond 15 feet',
      'Beyond 20 feet',
      'Beyond 30 feet'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 20): "Stopping, Standing or Parking is permitted only momentarily to pick up or drop off passengers... Within 15 feet of a fire hydrant."'
  },
  {
    id: 'sec5-park-002',
    topic: 'Stopping, Standing, and Parking',
    pageRef: 20,
    question: 'How close to a stop sign, yield sign, or traffic control signal are you prohibited from parking or standing?',
    options: [
      'Within 15 feet',
      'Within 20 feet',
      'Within 30 feet',
      'Within 50 feet'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 20): "Stopping, Standing or Parking is permitted only momentarily to pick up or drop off passengers: Within 30 feet of a stop sign, yield sign, or traffic control signal."'
  },
  {
    id: 'sec5-park-003',
    topic: 'Stopping, Standing, and Parking',
    pageRef: 20,
    question: 'How close to a crosswalk at an intersection are you prohibited from parking?',
    options: [
      'Within 10 feet',
      'Within 20 feet',
      'Within 30 feet',
      'Within 50 feet'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 20): "Stopping, standing, or parking is permitted only momentarily to pick up/drop off passengers within 20 feet of a crosswalk at an intersection."'
  },
  {
    id: 'sec5-park-004',
    topic: 'Stopping, Standing, and Parking',
    pageRef: 20,
    question: 'Stopping, standing, or parking is prohibited within how many feet of a railroad crossing?',
    options: [
      'Within 15 feet',
      'Within 30 feet',
      'Within 50 feet',
      'Within 100 feet'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 20): "Stopping, standing or parking is prohibited within 50 feet of a railroad crossing."'
  },
  {
    id: 'sec5-park-005',
    topic: 'Stopping, Standing, and Parking',
    pageRef: 20,
    question: 'How close to a fire station driveway may you park on the same side of the street, and across the street?',
    options: [
      'Within 10 feet on same side; 25 feet across street.',
      'Within 20 feet of the driveway entrance; within 75 feet on the side opposite the entrance.',
      'Within 50 feet on both sides.',
      'Within 15 feet on same side; 50 feet across street.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 20): "Within 20 feet of a fire station driveway; Within 75 feet of the spot across the street from a fire station driveway."'
  },
  {
    id: 'sec5-park-006',
    topic: 'Parallel Parking & Straight Line Backing',
    pageRef: 20,
    question: 'When parallel parked, your vehicle must be parked not more than how many inches from the curb?',
    options: [
      'Not more than 6 inches',
      'Not more than 12 inches',
      'Not more than 18 inches',
      'Not more than 24 inches'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 20): "Park midway between two standards so that your car is not more than 18 inches from the curb. The standard parallel parking dimensions utilized in the driver\'s license test are 22 feet in length by 10 feet in depth."'
  },
  {
    id: 'sec5-slow-001',
    topic: 'Slow Poke Law & Impeding Traffic',
    pageRef: 20,
    question: 'Under Georgia\'s "Slow Poke" Law (House Bill 459), when faster-moving traffic approaches behind you in the left passing lane, what must you do?',
    options: [
      'Maintain speed if you are traveling at the posted speed limit.',
      'Move out of the passing lane and over to the right, regardless of the speed you are traveling.',
      'Tap your brakes to warn the tailgater.',
      'Speed up by 15 mph to match their pace.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 20): "The \'Slow Poke\' Law (HB 459): Slower drivers must move out of the passing lane (most left-hand lanes) and over to the right to allow faster-moving traffic to proceed. Regardless of the speed you are traveling, you must move from the lane when faster traffic is approaching."'
  },

  // --- Page 21: Backing Up, Super Speeder, Speed Limits, Railroad Crossings ---
  {
    id: 'sec5-back-001',
    topic: 'Parallel Parking & Straight Line Backing',
    pageRef: 21,
    question: 'When backing up a vehicle, what is the proper procedure?',
    options: [
      'Rely solely on your rearview mirror and backup camera.',
      'Turn your head and look over your right shoulder while backing; do not depend solely on your mirrors.',
      'Honk your horn continuously and back rapidly.',
      'Keep your eyes locked on the left side mirror.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 21): "Before backing, check all sides of your vehicle to make sure it is safe to do so. You should turn your head and look over your right shoulder while backing; do not depend on your mirrors."'
  },
  {
    id: 'sec5-speed-001',
    topic: 'Super Speeder Law',
    pageRef: 21,
    question: 'Under Georgia\'s Super Speeder Law, what speeds trigger the $200 state fee?',
    options: [
      '65 mph on any road, or 80 mph on an interstate.',
      '75 mph or more on a two-lane road, or 85 mph or more on any road or highway in Georgia.',
      '90 mph on rural interstates only.',
      '20 mph over any posted speed limit.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 21): "Any driver convicted of speeding 75 mph or more on a two-lane road or 85 miles per hour or more on any road in Georgia, will be assessed a $200 state fee. Failure to pay on time results in license suspension and a $50 reinstatement fee."'
  },
  {
    id: 'sec5-speed-002',
    topic: 'Traveling Speed & Speed Limits',
    pageRef: 21,
    question: 'What is the maximum speed limit in any urban or residential district in Georgia unless otherwise posted?',
    options: [
      '25 miles per hour',
      '30 miles per hour',
      '35 miles per hour',
      '45 miles per hour'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 21): "Speed Limits: 30 miles per hour in any urban or residential district."'
  },
  {
    id: 'sec5-speed-003',
    topic: 'Traveling Speed & Speed Limits',
    pageRef: 21,
    question: 'What is the maximum speed limit on an unpaved county road in Georgia unless otherwise posted?',
    options: [
      '25 miles per hour',
      '30 miles per hour',
      '35 miles per hour',
      '45 miles per hour'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 21): "35 miles per hour on an unpaved county road."'
  },
  {
    id: 'sec5-speed-004',
    topic: 'Traveling Speed & Speed Limits',
    pageRef: 21,
    question: 'What is the maximum speed limit on a rural interstate in Georgia unless otherwise posted?',
    options: [
      '55 miles per hour',
      '65 miles per hour',
      '70 miles per hour',
      '75 miles per hour'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 21): "70 miles per hour on a rural interstate."'
  },
  {
    id: 'sec5-speed-005',
    topic: 'Traveling Speed & Speed Limits',
    pageRef: 21,
    question: 'What is the maximum speed limit on an urban interstate or multi-lane divided highway unless otherwise posted?',
    options: [
      '55 miles per hour',
      '60 miles per hour',
      '65 miles per hour',
      '70 miles per hour'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 21): "65 miles per hour on an urban interstate or on a multi-lane divided highway."'
  },
  {
    id: 'sec5-speed-006',
    topic: 'Slow Poke Law & Impeding Traffic',
    pageRef: 21,
    question: 'What are the penalties for driving too slowly so as to impede traffic or refusing to vacate the passing lane?',
    options: [
      'A warning only.',
      'A fine up to $1,000 and/or 3 points on the driving record.',
      'Mandatory 6-month vehicle impoundment.',
      'A $50 fee with no points assessed.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 21): "Penalties include fine up to $1000 and/or 3 points on the driving record."'
  },
  {
    id: 'sec5-rr-001',
    topic: 'Railroad Crossings & 7 Safety Steps',
    pageRef: 21,
    question: 'When approaching a railroad crossing where signals are flashing or gates are down, you must stop within what distance from the nearest rail?',
    options: [
      'Within 25 feet, but not less than 5 feet.',
      'Within 50 feet, but not less than 15 feet.',
      'Within 100 feet, but not less than 50 feet.',
      'Exactly 10 feet from the track.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 21): "You must always stop within 50 feet, but not less than 15 feet, from the nearest rail of a railroad crossing when the signal is flashing, gates lowered, or a train is approaching."'
  },
  {
    id: 'sec5-rr-002',
    topic: 'Railroad Crossings & 7 Safety Steps',
    pageRef: 21,
    question: 'If your vehicle stalls on a railroad track, what should you do first?',
    options: [
      'Stay inside the vehicle and repeatedly attempt to restart the engine.',
      'Get out immediately, move away from the tracks, and locate the Emergency Notification Systems (ENS) sign to call for help.',
      'Push the vehicle backwards alone without checking for trains.',
      'Wait for the crossing arms to lower before exiting.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 21): "If your vehicle stalls on the tracks, do the following: Get out immediately; Move away; Locate Emergency Notification Systems (ENS) sign containing emergency contact information; Call for help!"'
  },

  // --- Page 22: Highway Work Zones & Flaggers ---
  {
    id: 'sec5-work-001',
    topic: 'Highway Work Zones, Flaggers & Amber Lights',
    pageRef: 22,
    question: 'What color background do standard warning signs in highway work zones have?',
    options: [
      'Yellow background with black lettering.',
      'Orange background with black letters or symbols.',
      'Fluorescent pink with white lettering.',
      'Blue with white symbols.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 22): "Warning signs in work zones have an orange background and black letters or symbols. Watch for the color orange. It means road work."'
  },
  {
    id: 'sec5-work-002',
    topic: 'Highway Work Zones, Flaggers & Amber Lights',
    pageRef: 22,
    question: 'What legal authority does a flagger have in a highway work zone?',
    options: [
      'A flagger can only make recommendations that drivers can ignore.',
      'A flagger has the same authority as a regulatory sign; you must not disobey their traffic control directions.',
      'A flagger only has authority if accompanied by a sworn law enforcement officer.',
      'Flaggers only direct heavy commercial trucks, not cars.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 22): "Obey Flaggers: Flaggers are people used to direct traffic through and around work zones. In a work zone, a flagger has the same authority as a regulatory sign. Do not disobey a flagger\'s traffic control directions."'
  },
  {
    id: 'sec5-work-003',
    topic: 'Highway Work Zones, Flaggers & Amber Lights',
    pageRef: 22,
    question: 'What are the legal penalties for disobeying regulatory speed limits in a work zone in Georgia?',
    options: [
      'Standard $50 speeding citation.',
      'Misdemeanor of a high and aggravated nature punished by a fine of $100 to $2,000, imprisonment up to 12 months, or both.',
      'Civil fine of $25 only.',
      'Immediate revocation of vehicle registration.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 22): "Motorists who disobey regulatory speed limits in a work zone may be found guilty of a misdemeanor of a high and aggravated nature and will be punished by a fine of not less than $100.00 nor more than $2,000.00, or by imprisonment for a term not to exceed 12 months, or both."'
  },
  {
    id: 'sec5-work-004',
    topic: 'Highway Work Zones, Flaggers & Amber Lights',
    pageRef: 22,
    question: 'When approaching work vehicles or mobile equipment displaying flashing or revolving amber lights, you must:',
    options: [
      'Accelerate past them before they change lanes.',
      'Yield the right-of-way, reduce your speed, and follow any directions displayed.',
      'Honk your horn to indicate you are passing.',
      'Shift into neutral.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 22): "Yield to Amber Lights in Work Zones: Work vehicles and heavy equipment will typically have flashing or revolving amber lights. You must yield the right-of-way to these vehicles. Reduce your speed as you approach."'
  },

  // --- Page 23: Controlled Access, Coasting, DUI, Reckless, Racing, Trailers ---
  {
    id: 'sec5-ctrl-001',
    topic: 'Controlled-Access Roadways & Peach Pass',
    pageRef: 23,
    question: 'Is backing up permitted on controlled-access roadways (such as expressways and freeways)?',
    options: [
      'Yes, if you miss your exit ramp and stay on the shoulder.',
      'No, backing up is strictly prohibited on controlled-access roadways.',
      'Yes, up to 100 feet in an emergency.',
      'Yes, if hazard lights are active.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 23): "Backing up is prohibited on controlled-access roadways. You are prohibited from entering or leaving any controlled-access roadway at unauthorized entrances or exits."'
  },
  {
    id: 'sec5-coast-001',
    topic: 'Coasting & Mechanical Prohibitions',
    pageRef: 23,
    question: 'When traveling down a steep hill, Georgia law prohibits drivers from:',
    options: [
      'Using engine braking or lower gears.',
      'Coasting with the transmission or gears of the vehicle in neutral.',
      'Keeping headlights on.',
      'Using the foot brake intermittently.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 23): "Coasting: The driver of any motor vehicle, when traveling down a hill, must not coast with the gears or transmission of the vehicle in neutral."'
  },
  {
    id: 'sec5-dui-001',
    topic: 'Driving Under the Influence of Drugs or Alcohol (DUI)',
    pageRef: 23,
    question: 'In Georgia, a driver 21 years of age or older is legally considered "Under the Influence of Alcohol" at what blood alcohol concentration (BAC)?',
    options: [
      '0.02 gm or more',
      '0.05 gm or more',
      '0.08 gm or more',
      '0.10 gm or more'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 23): "A person 21 or more years of age is considered \'Under the Influence of Alcohol\' when 0.08 gm or more by alcohol weight is present in the blood."'
  },
  {
    id: 'sec5-dui-002',
    topic: 'Driving Under the Influence of Drugs or Alcohol (DUI)',
    pageRef: 23,
    question: 'Under Georgia law, a driver under 21 years of age is considered "Under the Influence of Alcohol" at what BAC?',
    options: [
      '0.00 gm only',
      '0.02 gm or more',
      '0.08 gm or more',
      '0.05 gm or more'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 23): "A person under 21 years of age is irrefutably considered \'Under the Influence of Alcohol\' when 0.02 gm or more by alcohol weight is present in the blood."'
  },
  {
    id: 'sec5-dui-003',
    topic: 'Driving Under the Influence of Drugs or Alcohol (DUI)',
    pageRef: 23,
    question: 'Can you be convicted of DUI in Georgia if you were driving under the influence of legally prescribed medication?',
    options: [
      'No, a valid doctor\'s prescription is an absolute defense to DUI charges.',
      'Yes, having a prescription is not a defense if the medication impairs your ability to safely operate a motor vehicle.',
      'Only if the medication was prescribed out of state.',
      'Only if you were also exceeding the speed limit.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 23): "Having a prescription for certain medication is not a defense if the medication impairs your ability to safely operate a motor vehicle."'
  },
  {
    id: 'sec5-reck-001',
    topic: 'Reckless & Aggressive Driving',
    pageRef: 23,
    question: 'What is the definition and penalty for Aggressive Driving in Georgia?',
    options: [
      'Honking your horn twice; punished by a $25 ticket.',
      'Operating a vehicle with the intent to annoy, harass, molest, intimidate, injure, or obstruct another person; misdemeanor of a high and aggravated nature, with license suspension if under 21.',
      'Driving 5 mph below the speed limit on a multi-lane highway.',
      'Passing a commercial truck on the right.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 23): "Aggressive Driving: Operating any motor vehicle with the intent to annoy, harass, molest, intimidate, injure, or obstruct another person... Misdemeanor of a high and aggravated nature; suspension of all privileges if under 21."'
  },
  {
    id: 'sec5-race-001',
    topic: 'Racing & Reckless Stunt Driving',
    pageRef: 23,
    question: 'What is the mandatory suspension penalty for a 1st conviction of Reckless Stunt Driving within 5 years?',
    options: [
      '30-day suspension with no fee.',
      '12-month suspension (eligible for early reinstatement at 120 days, restoration fee $210 / $200 by mail).',
      '3-year permanent revocation.',
      '60 hours of community service only.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 23): "1st Conviction within 5 years: 12-month suspension; Eligible for early reinstatement at the end of 120 days; Restoration fee $210/$200 by mail; Limited Permit Available."'
  },
  {
    id: 'sec5-truck-001',
    topic: 'Trucks, Trailers & Caravanning',
    pageRef: 23,
    question: 'What is the maximum legal width for trailers permitted on Georgia\'s highways without a special permit?',
    options: [
      '7 feet, 6 inches',
      '8 feet, 0 inches',
      '8 feet, 6 inches',
      '9 feet, 2 inches'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 23): "Trailers wider than 8 feet, 6 inches are not permitted on Georgia\'s highways."'
  },
  {
    id: 'sec5-truck-002',
    topic: 'Trucks, Trailers & Caravanning',
    pageRef: 23,
    question: 'Is it legal for passengers to ride inside a house trailer while it is being towed on a public highway?',
    options: [
      'Yes, if passengers wear seatbelts.',
      'Yes, during daylight hours only.',
      'No, riding in a house trailer or any vehicular drawn trailer while in motion is strictly illegal.',
      'Yes, if the trailer has functioning safety chains.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 23): "Riding in Trailers: Riding in a house trailer, or any other vehicular drawn trailer, is not allowed while it is being moved upon a street or highway."'
  },
  {
    id: 'sec5-hear-001',
    topic: 'Impaired Hearing, View Obstruction & Doors',
    pageRef: 23,
    question: 'Is a driver legally allowed to wear headphones or a headset while operating a motor vehicle in Georgia?',
    options: [
      'Yes, as long as the volume is kept low.',
      'Yes, but only in one ear for phone calls.',
      'No, it is unlawful to operate a motor vehicle while wearing headphones, headsets, or any device impairing hearing.',
      'Yes, on interstate highways only.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 23): "Impaired Hearing and Vision: It is unlawful to operate a motor vehicle while wearing a headphone, headset, or any other device which would impair the driver\'s ability to hear."'
  },
  {
    id: 'sec5-door-001',
    topic: 'Impaired Hearing, View Obstruction & Doors',
    pageRef: 23,
    question: 'When is it lawful to open a vehicle door on the side facing moving traffic?',
    options: [
      'At any time once the vehicle comes to a complete stop.',
      'Only when it is safe to do so and can be done without interfering with other traffic, including bicyclists.',
      'Never on any street or road.',
      'Only if you open it halfway.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 23): "Opening Vehicle Doors: Opening the doors of a vehicle on the side on which traffic is moving is prohibited unless it is safe to do so and unless it can be done without interfering with the movement of other traffic, including bicyclists."'
  },

  // --- Page 24: Headlights, Night Driving, Litter Control, Seat Belts, Child Restraints ---
  {
    id: 'sec5-light-001',
    topic: 'Headlights Properly & Night Driving',
    pageRef: 24,
    question: 'During what statutory time periods must headlights be illuminated while driving in Georgia?',
    options: [
      'From sunset to sunrise.',
      'Between one-half hour after sunset to one-half hour before sunrise; at any time when raining; or when visibility is limited.',
      'Only between 9:00 PM and 6:00 AM.',
      'From dusk till dawn regardless of weather.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 24): "You must use your headlights between one-half hour after sunset to one-half hour before sunrise; at any time when it is raining; or when visibility is limited."'
  },
  {
    id: 'sec5-light-002',
    topic: 'Headlights Properly & Night Driving',
    pageRef: 24,
    question: 'You must dim your high-beam headlights when you are within how many feet of an approaching vehicle and when following another vehicle?',
    options: [
      '300 feet of approaching vehicle; 100 feet when following.',
      'Within 500 feet of an approaching vehicle, and within 200 feet when following closely behind another vehicle.',
      'Within 1000 feet of approaching vehicle; 500 feet following.',
      'Within 200 feet approaching; 50 feet following.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 24): "You should dim (lower) your headlights when: You are within 500 feet of an approaching vehicle so as not to blind the driver; You are following closely (within 200 feet) behind another vehicle."'
  },
  {
    id: 'sec5-light-003',
    topic: 'Headlights Properly & Night Driving',
    pageRef: 24,
    question: 'What does "overdriving your headlights" mean?',
    options: [
      'Driving with high beams on illuminated city streets.',
      'Driving at a speed that requires a stopping distance greater than the distance illuminated by your headlights.',
      'Using halogen bulbs that exceed wattage ratings.',
      'Driving with fog lights and high beams on at the same time.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 24): "Don\'t \'overdrive\' your headlights. When traveling at night... do not drive at a speed that requires a stopping time greater than the distance illuminated by your headlights."'
  },
  {
    id: 'sec5-litter-001',
    topic: "Georgia's Litter Control Law",
    pageRef: 24,
    question: "Under Georgia's Litter Control Law, littering is classified as:",
    options: [
      'A minor civil infraction punishable by a $10 warning.',
      'Damage to property and a misdemeanor punishable by a fine up to $1,000, a 12-month jail term, and mandatory trash collection.',
      'An infraction that assesses 4 points on your driving record.',
      'A non-punishable administrative citation.'
    ],
    correctAnswerIndex: 1,
    explanation: "Georgia DDS Manual (Page 24): Georgia's Litter Control Law classifies littering as damage to property. A conviction is a misdemeanor assessed a fine up to $1,000 and a 12-month jail term, and a judge could order the convicted person to pick up and remove litter."
  },
  {
    id: 'sec5-belt-001',
    topic: 'Safety Belts & Child Restraints',
    pageRef: 24,
    question: 'Who is required to wear safety belts in passenger vehicles in Georgia?',
    options: [
      'Only the driver.',
      'Each occupant in the front seat, and ALL occupants under 18 years of age anywhere in the passenger vehicle.',
      'Only passengers riding on interstate highways.',
      'Only passengers under 12 years of age.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 24): "Georgia law states that each occupant in the front seat of a passenger vehicle traveling on Georgia roads must be secured by a seat safety belt. All occupants of any passenger vehicle must utilize a seat safety belt if they are under the age of 18. Georgia has a \'primary\' safety belt law."'
  },
  {
    id: 'sec5-child-001',
    topic: 'Safety Belts & Child Restraints',
    pageRef: 24,
    question: 'Under Georgia law, children under what age must be properly restrained in an approved child passenger restraint system?',
    options: [
      'Children under 4 years of age.',
      'Children under 6 years of age.',
      'Children under 8 years of age (except in a taxicab or public transit vehicle).',
      'Children under 10 years of age.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Georgia DDS Manual (Page 24): "Every driver transporting a child who is under eight years of age, except in a taxicab or public transit vehicle, must properly restrain the child in a child passenger restraining system appropriate for the child\'s height and weight (FMVSS 213)."'
  },
  {
    id: 'sec5-emerg-001',
    topic: 'Following Emergency Vehicles & Passing Mail/Sanitation',
    pageRef: 24,
    question: 'When following a fire apparatus traveling in response to a fire alarm, what minimum distance must you maintain?',
    options: [
      'At least 100 feet',
      'At least 200 feet',
      'At least 300 feet',
      'At least 500 feet'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 24): "The driver of any vehicle, other than one on official business, must not follow any fire fighting apparatus traveling in response to a fire alarm, or other emergency vehicles, closer than 200 feet."'
  },
  {
    id: 'sec5-emerg-002',
    topic: 'Following Emergency Vehicles & Passing Mail/Sanitation',
    pageRef: 24,
    question: 'How far must you park away from any fire apparatus stopped in answer to a fire alarm?',
    options: [
      'At least 100 feet',
      'At least 200 feet',
      'At least 300 feet',
      'At least 500 feet'
    ],
    correctAnswerIndex: 3,
    explanation: 'Georgia DDS Manual (Page 24): "The driver of any vehicle... must not park any vehicle within 500 feet of any fire apparatus stopped in answer to a fire alarm."'
  },

  // --- Page 25: Hands Free Georgia Law HB 673 & Postal/Sanitation Vehicles ---
  {
    id: 'sec5-hands-001',
    topic: 'Distracted Driving & Hands Free Law (HB 673)',
    pageRef: 25,
    question: 'Under Georgia\'s Hands Free Law (HB 673), what are drivers prohibited from doing while operating a motor vehicle?',
    options: [
      'Using GPS navigation on a mounted dashboard holder.',
      'Holding or supporting a wireless telecommunications device or stand-alone electronic device with any part of the body.',
      'Listening to music through a bluetooth car stereo.',
      'Talking hands-free using an earpiece.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 25): "Georgia has a Hands Free Law (HB 673) that mandates that drivers are not allowed to hold or support a phone with any part of the body for any reason. Writing, sending or reading texts, and watching/recording video is prohibited."'
  },
  {
    id: 'sec5-hands-002',
    topic: 'Distracted Driving & Hands Free Law (HB 673)',
    pageRef: 25,
    question: 'What are the penalties and driving record points for convictions under Georgia\'s Hands Free Law?',
    options: [
      '1st conviction: $25 (0 pts); 2nd: $50 (1 pt); 3rd: $75 (2 pts)',
      '1st conviction: 1 point and fine not more than $50; 2nd conviction: 2 points and fine not more than $100; 3rd or more: 3 points and fine not more than $150.',
      '1st conviction: $250; 2nd: $500; 3rd: License revoked.',
      '3 points for every conviction with a flat $200 fee.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 25): "Penalties for Hands Free Law: 1st conviction - 1 point and fine not more than $50.00; 2nd conviction - 2 points and fine not more than $100.00; 3rd or more convictions - 3 points and fine not more than $150.00."'
  },
  {
    id: 'sec5-mail-001',
    topic: 'Following Emergency Vehicles & Passing Mail/Sanitation',
    pageRef: 25,
    question: 'When approaching a postal service vehicle or sanitation vehicle displaying flashing amber, yellow, white, or red lights, what must you do if a lane change is impossible or unsafe?',
    options: [
      'Maintain speed and drive on the shoulder.',
      'Reduce vehicle speed to at least 10 mph less than the posted speed limit or 25 mph, whichever is more, and be prepared to stop.',
      'Honk repeatedly until the mail carrier pulls off the roadway.',
      'Come to a complete stop and remain stopped for 5 minutes.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 25): "Reduce the speed of the motor vehicle to a reasonable and proper speed... which speed shall be at least ten miles per hour less than the posted speed limit or 25 miles per hour, whichever is more, and be prepared to stop. Fines up to $250.00."'
  },

  // Flashing lights & Signals (explicitly highlighted by user)
  {
    id: 'sec5-signal-001',
    topic: 'Laws Governing Right-of-Way',
    pageRef: 17,
    question: 'What does a flashing red traffic light mean at an intersection in Georgia?',
    options: [
      'Yield to oncoming traffic and proceed without stopping if clear.',
      'Treat it exactly like a stop sign: come to a complete stop, yield to pedestrians and oncoming traffic, then proceed when safe.',
      'The signal is undergoing routine maintenance and has no legal authority.',
      'Only trucks and buses must stop.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 17 & 34): "A red flashing light means you must stop completely (treat as you would a stop sign). Proceed with caution only after yielding the right-of-way to pedestrians and to other vehicles at the intersection."'
  },
  {
    id: 'sec5-signal-002',
    topic: 'Laws Governing Right-of-Way',
    pageRef: 17,
    question: 'What does a flashing yellow traffic light mean at an intersection?',
    options: [
      'Prepare to stop because the light is about to turn solid red.',
      'Slow down and exercise caution before proceeding through the intersection.',
      'Come to a complete stop and wait for a green arrow.',
      'Vehicles on the intersecting road have right-of-way.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 17 & 34): "A yellow flashing light means you must slow down and exercise caution before proceeding through the intersection."'
  },
  {
    id: 'sec5-bus-001',
    topic: 'Laws Governing Right-of-Way',
    pageRef: 18,
    question: 'When a school bus stops on a divided highway with a dirt, grass, or barrier median, who must stop?',
    options: [
      'Traffic in all directions must stop.',
      'Only traffic traveling in the same direction following or alongside the school bus must stop; oncoming traffic on the other side of the median is not required to stop.',
      'No vehicles need to stop if the bus is in the rightmost lane.',
      'Only commercial trucks must stop.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 18): "On a highway divided by a median, cars traveling on the opposite side from the stopped school bus are not required to stop, however drivers should remain attentive for children walking along or crossing the roadway."'
  },
  {
    id: 'sec5-bus-002',
    topic: 'Laws Governing Right-of-Way',
    pageRef: 18,
    question: 'When a school bus stops on a two-lane or four-lane road WITHOUT a median separation, who must stop?',
    options: [
      'Only traffic directly behind the school bus.',
      'All traffic from both directions must stop completely.',
      'Only vehicles with passengers under 18 years of age.',
      'Traffic from the opposite direction may pass at 15 mph.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Georgia DDS Manual (Page 18 & 44): "On a two-lane roadway or multi-lane roadway without a median separation, ALL traffic from both directions must stop when the school bus activates its flashing red lights and stop arm."'
  }
];
