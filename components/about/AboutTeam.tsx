'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function AboutTeam() {
  const t = useTranslations('about.team');

  const teamMembers = [
    {
      name: 'Adedap',
      bio: 'A business strategist from Nigeria, had spent years watching brilliant creators being overlooked — not because they lacked skill, but because they didn’t fit the mold.',
    },
    {
      name: 'Norina',
      bio: 'A marketing mind from Austria with Indian roots, crafted campaigns for global brands yet rarely saw faces or stories that mirrored her own.',
    },
    {
      name: '',
      bio: '',
    },
  ];

  return (
    <section className='about-team'>
      <h3 className='text-h3 font-secondary'>Our Founding Story</h3>
      <h2 className='text-h2 font-heading'>
        Born in Berlin; founded by 3 friends from different corners of the world
      </h2>

      <p className='text-h5 max-w-2/3 text-white mt-8'>
        Huerray grew from a simple observation: great creators were being
        overlooked because they didn’t fit a narrow template. So we built a
        platform that makes visibility scalable — where creators are trusted to
        lead narratives and brands get content that actually connects.
      </p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-32 gap-6'>
        <div className='max-lg:hidden'></div>
        {teamMembers.map((member, index) => (
          <div key={index} className={cn('flex flex-col')}>
            <Image
              src={`/images/about/team/${index + 1}.png`}
              alt={member.name}
              width={300}
              height={300}
              className='mb-4 bg-slate-200 rounded-2xl aspect-4/5'
            />
            <h4 className='text-h4 font-secondary mb-0'>{member.name}</h4>
            <p className='leading-tight text-white mb-0'>{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
