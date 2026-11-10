const resourcePersonDirectory = [
  ['Rakesh Gupta', 'Former Joint Director (Admin); Forensic Expert'],
  ['Dr. Sayeed Ahmed', 'Deputy Director, CFSL'],
  ['Monu Verma', 'Assistant Professor'],
  ['Mr. Ramesh Chandra', 'Former Forensic Document Expert'],
  ['Dr. Prasanna Parthsarathy', 'Senior Assistant Professor, Forensic Medicine'],
  ['Dr. Pankaj Nema', 'Associate Professor; Medicolegal Consultant'],
  ['Dr. Humeera Mulla', 'Director, Forensic Odontology Course; Forensic Odontologist'],
  ['Mr. Calil Makhoul', 'PhD Research Scholar, Forensic Anthropology'],
  ['Mr. Dinesh Sharma', 'Former Assistant Director; Senior Scientific Officer'],
  ['Dr. Kamini Bhoir', 'Forensic Expert'],
  ['Dr. Mukul Sharma', 'Faculty; Forensic Medicine Specialist'],
  ['N.B. Bardhan', 'Former Director, CFSL/CBI; Ballistics Expert'],
  ['Khalida Nazeer', 'Assistant Professor; Former Forensic Scientific Assistant'],
  ['Fabrizio Degni', 'Director, Digital Transformation and Innovation'],
  ['D.P. Gangwar', 'Forensic Professional; Former Guest Faculty'],
  ['Dr. Gregoria B Mendoza', 'Criminologist; Forensic Handwriting Expert'],
  ['Sanjay Bafna', 'Assistant Professor of Law'],
  ['Prof Andrea Nava', 'Geologist; Forensic Geology Consultant'],
  ['Dr. Vishal Sharma', 'Associate Professor; Former Chairperson'],
  ['Neeraj Varshney', 'Assistant Director, Forensic Science Laboratory'],
  ['Sunita Rani', 'Assistant Professor; Founding Faculty Member'],
  ['Dr. Rajesh Verma', 'Former Director, Forensic Services'],
  ['Dr. Sanjeev Sir', 'Former Deputy Director; Head of Biology and DNA Fingerprinting'],
  ['Yogesh Kumar', 'Former FSL In-charge; Forensic Professional'],
  ['Emanuel Amin', 'Assistant Lab Coordinator; Former Teaching and Research Assistant'],
  ['Mr. Anurag Sahu', 'Assistant Professor, Forensic Science'],
  ['Ms. Manpreet Kaur', 'Assistant Professor, Forensic Science'],
  ['Mr. Innocent Makasa', 'Acting State Forensic Analyst; Forensic DNA Analyst'],
  ['Ms. Palack Asati', 'Assistant Professor; Head of Department (In-Charge)'],
  ['Dr. Komal Yadav', 'Assistant Professor, Forensic Science'],
  ['Mr. Mebin W Thomas', 'PhD Research Scholar; Former Scientific Officer'],
  ['Dr. Rupali Andaluri', 'Assistant Director; Scientist C, Forensic Psychology'],
  ['Dr. Priyanka Kacker', 'Associate Professor, Behavioral Forensics'],
  ['Pooja Tomar', 'Founder-Director; Forensic-Clinical Psychologist'],
  ['Dr. Mukesh Sharma', 'Assistant Director, Physics Division'],
  ['Anudeep Sama', 'Assistant Professor, Cyber Security'],
  ['Advocate Arpita Dey', 'Practicing Advocate'],
  ['Dr. Navjot Kaur Kanwal', 'Assistant Professor'],
  ['Dr. Navpreet Kaur', 'Co-founder and Vice President; Lawyer'],
  ['Ms. Kaashika', 'Forensic Psychology Professional'],
  ['Ms. Vaishnavi Sawant', 'Assistant Professor; Criminology and Forensic Science Specialist'],
  ['Prof (Mrs) Vinny Sharma', 'Professor of Forensic Science'],
  ['Dr. Radha Patel', 'Assistant Professor, Forensic Science'],
  ['Dr. Shivani R Pandya', 'Assistant Professor; Former Head of Department'],
  ['Dr. Narendra S Pandey', 'Former Director; Scientist E; Ballistics Expert'],
  ['Swati Dubey', 'Head of Department, Forensic Science'],
  ['Dr. Arushi Chawla', 'Senior Forensic Assistant; Former Academic Head'],
  ['Dr. Sarthak Rathod', 'Behavioral Scientist; Psychologist; Former Forensic Psychologist'],
  ['Tiyasha Pariya', 'Scientific Assistant, Cyber Forensics'],
  ['Dr. Ikramaul Haque', 'Former Director, CFSL Chandigarh'],
  ['Dr. Rohan A Gawali', 'Forensic Odontologist'],
  ['Dr. Nirali Patel', 'Assistant Professor; Forensic Odontologist'],
  ['Dr. Zakaria', 'Forensic Document Expert'],
  ['Andaluri Naresh Babu', 'Retired Senior Forensic Professional'],
  ['K M Varshney', 'Former Director, CFSL; Forensic Scientist'],
  ['Vikas Tete', 'Digital Forensic Expert'],
  ['Mr. Ajay Biswas', 'Assistant Professor, Forensic Science'],
  ['Ms. Anisha Anant Kudaskar', 'Assistant Professor, Criminology and Forensic Science'],
] as const

const HONORIFIC_PREFIX =
  /^(?:(?:mr|mrs|ms|miss|dr|prof|professor|advocate)\s*)+/i

function normalizePersonName(name: string): string {
  return name
    .replace(/[().]/g, ' ')
    .replace(HONORIFIC_PREFIX, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function hasHonorific(name: string): boolean {
  return /^(?:mr|mrs|ms|miss|dr|prof|professor|advocate)\b/i.test(name.trim())
}

const directoryByName = new Map(
  resourcePersonDirectory.map(([name, designation]) => [
    normalizePersonName(name),
    { name, designation },
  ]),
)

export function getResourcePersonDirectoryEntry(name: string) {
  const entry = directoryByName.get(normalizePersonName(name))
  if (!entry) return undefined

  return {
    name: hasHonorific(name) || !hasHonorific(entry.name) ? name : entry.name,
    designation: entry.designation,
  }
}
