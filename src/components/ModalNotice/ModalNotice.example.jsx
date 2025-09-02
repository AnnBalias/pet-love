import { useState } from 'react';
import ModalNotice from './ModalNotice';

// Приклад тестових даних для демонстрації компонента
const exampleNotices = [
  {
    id: '1',
    title: 'Lovely Golden Retriever Puppy',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    pet: 'Max',
    birthDate: '2024-01-15',
    gender: 'male',
    petType: 'dog',
    category: 'sell',
    popularity: 42,
    comment:
      'Beautiful and friendly Golden Retriever puppy. He loves playing with children and other dogs. All vaccinations are up to date.',
    location: 'Kyiv',
    price: 800,
    isFavorite: false,
    contactInfo: {
      email: 'seller@example.com',
      phone: '+380501234567',
      telegram: 'seller_pets',
    },
  },
  {
    id: '2',
    title: 'Lost Cat - Please Help Find',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    pet: 'Whiskers',
    birthDate: '2022-03-10',
    gender: 'female',
    petType: 'cat',
    category: 'lost-found',
    popularity: 156,
    comment:
      'Our beloved cat Whiskers went missing from our home in Lviv. She is very friendly and responds to her name. Please contact us if you see her.',
    location: 'Lviv',
    isFavorite: true,
    contactInfo: {
      phone: '+380671234567',
      email: 'owner@example.com',
    },
  },
  {
    id: '3',
    title: 'Adopt a Sweet Parrot',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400',
    pet: 'Polly',
    birthDate: '2020-08-22',
    gender: 'female',
    petType: 'bird',
    category: 'in-good-hands',
    popularity: 23,
    comment:
      'Beautiful African Grey Parrot looking for a loving home. She can talk and loves attention. Due to moving abroad, we need to find her a new family.',
    additionalInfo:
      'Comes with cage and toys. Prefers experienced bird owners.',
    isFavorite: false,
    contactInfo: {
      telegram: 'parrot_lover',
      email: 'parrot@example.com',
    },
  },
];

function ModalNoticeExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);

  const handleOpenModal = (notice) => {
    setCurrentNotice(notice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentNotice(null);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>ModalNotice Component Examples</h1>
      <p>Click on any notice to open the modal:</p>

      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {exampleNotices.map((notice) => (
          <div
            key={notice.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              cursor: 'pointer',
              backgroundColor: '#f9f9f9',
            }}
            onClick={() => handleOpenModal(notice)}
          >
            <h3>{notice.title}</h3>
            <p>
              <strong>Pet:</strong> {notice.pet}
            </p>
            <p>
              <strong>Category:</strong> {notice.category}
            </p>
            <p>
              <strong>Popularity:</strong> {notice.popularity}
            </p>
            <p>
              <strong>Location:</strong> {notice.location}
            </p>
            {notice.price && (
              <p>
                <strong>Price:</strong> ${notice.price}
              </p>
            )}
            <p style={{ color: '#666', fontSize: '14px' }}>
              Click to view details...
            </p>
          </div>
        ))}
      </div>

      <ModalNotice
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        notice={currentNotice}
      />
    </div>
  );
}

export default ModalNoticeExample;
