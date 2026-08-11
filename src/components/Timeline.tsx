'use client';

const timelineEvents = [
  {
    year: '1999',
    title: 'Birth',
    description: 'Alexander was born on June 1, 1999.',
  },
  {
    year: '2013',
    title: 'YouTube Beginnings',
    description: 'Created his YouTube channel on October 1, 2013.',
  },
  {
    year: '2019',
    title: 'Minecraft Monday',
    description: 'Rose to prominence through Minecraft Monday tournaments.',
  },
  {
    year: '2020',
    title: 'Dream SMP',
    description: 'Joined the Dream SMP, becoming one of its most iconic members.',
  },
  {
    year: '2021',
    title: '10 Million Subscribers',
    description: 'Reached 10 million subscribers on YouTube.',
  },
  {
    year: '2021',
    title: 'Cancer Diagnosis',
    description: 'Announced his sarcoma diagnosis in a video titled "so i have cancer".',
  },
  {
    year: '2022',
    title: 'Blood God Ascends',
    description: 'Alexander passed away on June 30, 2022. Technoblade Never Dies.',
  },
];

export function Timeline() {
  return (
    <div className="relative border-l-4 border-crown/50 ml-4 md:ml-8 space-y-8">
      {timelineEvents.map((event, index) => (
        <div key={index} className="relative pl-8">
          <div className="absolute -left-3 top-0 w-6 h-6 bg-blood rounded-full border-4 border-crown" />
          <div className="bg-nether/80 rounded-lg p-6 border border-blood/30">
            <span className="text-gold font-bold text-lg">{event.year}</span>
            <h3 className="text-xl font-bold text-crown mt-1">{event.title}</h3>
            <p className="text-gray-300 mt-2">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
