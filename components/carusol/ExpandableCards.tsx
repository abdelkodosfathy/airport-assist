import { useState } from 'react';

interface Card {
  id: number;
  image: string;
  title: string;
  description: string;
}

const DUMMY_CARDS: Card[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1604223190546-a43e4c7f29d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjYwMDMzNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Mountain Peaks',
    description: 'Explore the majestic beauty of towering mountain ranges and breathtaking alpine landscapes.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1533371452382-d45a9da51ad9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHN1bnNldHxlbnwxfHx8fDE3NjYwNzk5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Ocean Sunset',
    description: 'Witness the stunning colors of sunset reflecting on calm ocean waters, creating a serene atmosphere.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBuYXR1cmV8ZW58MXx8fHwxNzY2MDY3NTU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Forest Path',
    description: 'Walk through lush green forests filled with ancient trees and the peaceful sounds of nature.'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1493134799591-2c9eed26201a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3NjYwNzUwNDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'City Lights',
    description: 'Experience the vibrant energy of urban life with stunning skyline views and modern architecture.'
  }
];

interface ExpandableCardsProps {
  cards?: Card[];
}

export default function ExpandableCards({ cards = DUMMY_CARDS }: ExpandableCardsProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full h-full overflow-x-auto">
      <div className="flex flex-nowrap h-full min-w-max">
        {cards.map((card) => {
          const isExpanded = expandedId === card.id;
          
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                relative cursor-pointer overflow-hidden
                transition-all duration-500 ease-in-out
                ${isExpanded ? 'grow-3' : 'grow'}
              `}
              style={{ minWidth: '120px' }}
            >
              {/* Image Background */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className={`
                absolute inset-0 bg-black/40
                transition-all duration-500 ease-in-out
                ${isExpanded ? 'bg-black/50' : 'bg-black/20'}
              `} />
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6">
                <div className={`
                  transition-all duration-500 ease-in-out
                  ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}>
                  <h3 className="text-white mb-3">{card.title}</h3>
                  <p className="text-white/90">{card.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
