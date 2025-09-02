import { useState } from 'react';
import Pagination from './Pagination';

function PaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(20);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(`Перехід на сторінку ${page}`);
  };

  const examples = [
    { title: 'Мало сторінок (5)', totalPages: 5 },
    { title: 'Середня кількість (10)', totalPages: 10 },
    { title: 'Багато сторінок (20)', totalPages: 20 },
    { title: 'Дуже багато сторінок (50)', totalPages: 50 },
    { title: 'Одна сторінка', totalPages: 1 },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Pagination Component Examples</h1>

      <div style={{ marginBottom: '40px' }}>
        <h2>Інтерактивний приклад</h2>
        <p>
          Поточна сторінка: {currentPage} з {totalPages}
        </p>

        <div style={{ marginBottom: '20px' }}>
          <label>
            Загальна кількість сторінок:
            <input
              type="number"
              min="1"
              max="100"
              value={totalPages}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 1;
                setTotalPages(value);
                if (currentPage > value) {
                  setCurrentPage(value);
                }
              }}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={handlePageChange}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Різні сценарії</h2>
        {examples.map((example, index) => (
          <div key={index} style={{ marginBottom: '30px' }}>
            <h3>{example.title}</h3>
            <Pagination
              currentPage={1}
              totalPages={example.totalPages}
              onChange={(page) =>
                console.log(`Приклад ${index + 1}: сторінка ${page}`)
              }
            />
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Різні позиції на сторінці</h2>

        <div style={{ marginBottom: '20px' }}>
          <h4>На першій сторінці (з 20):</h4>
          <Pagination
            currentPage={1}
            totalPages={20}
            onChange={(page) => console.log(`Сторінка ${page}`)}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4>В середині (сторінка 10 з 20):</h4>
          <Pagination
            currentPage={10}
            totalPages={20}
            onChange={(page) => console.log(`Сторінка ${page}`)}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4>Близько до кінця (сторінка 18 з 20):</h4>
          <Pagination
            currentPage={18}
            totalPages={20}
            onChange={(page) => console.log(`Сторінка ${page}`)}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4>На останній сторінці (20 з 20):</h4>
          <Pagination
            currentPage={20}
            totalPages={20}
            onChange={(page) => console.log(`Сторінка ${page}`)}
          />
        </div>
      </div>

      <div>
        <h2>Код використання</h2>
        <pre
          style={{
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderRadius: '5px',
            overflow: 'auto',
          }}
        >
          {`import { useState } from 'react';
import Pagination from './components/Pagination/Pagination';

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(20);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Тут можна завантажити дані для нової сторінки
    fetchData(page);
  };

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={handlePageChange}
      />
    </div>
  );
}`}
        </pre>
      </div>
    </div>
  );
}

export default PaginationExample;
