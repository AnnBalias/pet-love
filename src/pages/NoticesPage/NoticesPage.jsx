import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useNotification } from '../../contexts/useNotification';
import Title from '../../components/Title/Title';
import NoticesFilters from '../../components/NoticesFilters/NoticesFilters';
import NoticesList from '../../components/NoticesList/NoticesList';
import Pagination from '../../components/Pagination/Pagination';
import css from './NoticesPage.module.css';

function NoticesPage() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    gender: '',
    petType: '',
    location: '',
    sortBy: 'popularity',
  });
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    genders: [],
    petTypes: [],
    locations: [],
  });
  const { showError } = useNotification();

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    fetchNotices();
  }, [filters, currentPage]);

  const fetchFilterOptions = async () => {
    try {
      const [categories, genders, petTypes, citiesLocations] = await Promise.all([
        api.getCategories(),
        api.getGenders(),
        api.getPetTypes(),
        api.getCitiesLocations(), // Використовуємо новий API для міст з нотаток
      ]);

      setFilterOptions({
        categories: categories || [],
        genders: genders || [],
        petTypes: petTypes || [],
        locations: citiesLocations || [], // Зберігаємо як locations для сумісності
      });
    } catch (error) {
      console.error('Error fetching filter options:', error);
      showError('Failed to load filter options. Please try again.');

      // Fallback на mock дані для розробки
      setFilterOptions({
        categories: [
          { id: 'sell', name: 'Sell' },
          { id: 'lost-found', name: 'Lost/Found' },
          { id: 'in-good-hands', name: 'In Good Hands' },
        ],
        genders: [
          { id: 'male', name: 'Male' },
          { id: 'female', name: 'Female' },
        ],
        petTypes: [
          { id: 'dog', name: 'Dog' },
          { id: 'cat', name: 'Cat' },
          { id: 'bird', name: 'Bird' },
          { id: 'fish', name: 'Fish' },
        ],
        locations: [
          { id: 'kyiv', name: 'Kyiv' },
          { id: 'lviv', name: 'Lviv' },
          { id: 'odesa', name: 'Odesa' },
          { id: 'kharkiv', name: 'Kharkiv' },
        ],
      });
    }
  };

  const fetchNotices = async () => {
    try {
      setIsLoading(true);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        ...filters,
      });

      const response = await api.getNotices(params.toString());

      if (response) {
        setNotices(response.notices || []);
        setTotalPages(response.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
      showError('Failed to load notices. Please try again.');

      // Fallback на mock дані для розробки
      setNotices([
        {
          id: 1,
          title: 'Found Red-Eared Slider',
          pet: 'Shelly',
          location: 'Odesa',
          category: 'Found',
          image: null,
          birthDate: '2019-08-12',
          gender: 'Unknown',
          petType: 'Turtle',
          popularity: 15,
          price: 40.99,
          comment: 'Found this turtle near the pond. Contact if yours.',
          isFavorite: false,
        },
        {
          id: 2,
          title: 'Lost Gecko',
          pet: 'Gizmo',
          location: 'Kyiv',
          category: 'Lost',
          image: null,
          birthDate: '2020-09-15',
          gender: 'Unknown',
          petType: 'Lizard',
          popularity: 23,
          price: 81.99,
          comment: 'Friendly gecko lost around the park. Reward offered.',
          isFavorite: true,
        },
        {
          id: 3,
          title: 'Golden Retriever Puppies',
          pet: 'Daisy',
          location: 'Lviv',
          category: 'Sell',
          image: null,
          birthDate: '2022-01-10',
          gender: 'Female',
          petType: 'Dog',
          popularity: 8,
          price: 257.99,
          comment: 'Adorable puppy looking for a loving home.',
          isFavorite: false,
        },
        {
          id: 4,
          title: 'Colorful Betta Fish',
          pet: 'Splash',
          location: 'Kharkiv',
          category: 'Sell',
          image: null,
          birthDate: '2023-03-20',
          gender: 'Male',
          petType: 'Fish',
          popularity: 12,
          price: 15.99,
          comment: 'Beautiful betta fish with vibrant colors.',
          isFavorite: false,
        },
        {
          id: 5,
          title: 'Golden Retriever Puppy',
          pet: 'Max',
          location: 'Dnipro',
          category: 'Sell',
          image: null,
          birthDate: '2022-01-15',
          gender: 'Male',
          petType: 'Dog',
          popularity: 18,
          price: 299.99,
          comment: 'Healthy and playful golden retriever puppy.',
          isFavorite: true,
        },
      ]);
      setTotalPages(3);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Скидаємо на першу сторінку при зміні фільтрів
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: '',
      gender: '',
      petType: '',
      location: '',
      sortBy: 'popularity',
    });
    setCurrentPage(1);
  };

  return (
    <div className={css.noticesPage}>
      <div className={css.container}>
        <Title text="Find your favorite pet" />

        <NoticesFilters
          filters={filters}
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        <NoticesList notices={notices} isLoading={isLoading} />

        {!isLoading && notices.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default NoticesPage;
