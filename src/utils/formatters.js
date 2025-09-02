// Форматування дати
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', defaultOptions);
  } catch {
    return '';
  }
};

// Форматування дати для відображення
export const formatDisplayDate = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const dateObj = new Date(date);
  const diffTime = Math.abs(now - dateObj);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return 'Today';
  } else if (diffDays === 2) {
    return 'Yesterday';
  } else if (diffDays <= 7) {
    return `${diffDays - 1} days ago`;
  } else {
    return formatDate(date, { month: 'short', day: 'numeric' });
  }
};

// Форматування популярності
export const formatPopularity = (popularity) => {
  if (!popularity) return '';
  
  const popularityMap = {
    high: 'High',
    medium: 'Medium',
    low: 'Low'
  };
  
  return popularityMap[popularity.toLowerCase()] || popularity;
};

// Форматування ціни
export const formatPrice = (price, currency = 'USD') => {
  if (!price || price === 0) return 'Free';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(price);
};

// Форматування телефонного номера
export const formatPhone = (phone) => {
  if (!phone) return '';
  
  // Видаляємо всі символи крім цифр
  const cleaned = phone.replace(/\D/g, '');
  
  // Форматуємо залежно від довжини
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('380')) {
    return `+380 ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
  }
  
  return phone; // Повертаємо оригінальний номер якщо не можемо форматувати
};

// Форматування розміру файлу
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Форматування кількості (1 item, 2 items, etc.)
export const formatCount = (count, singular, plural) => {
  if (count === 1) {
    return `1 ${singular}`;
  }
  return `${count} ${plural}`;
};

// Форматування імені (перша літера велика)
export const formatName = (name) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Форматування категорії
export const formatCategory = (category) => {
  if (!category) return '';
  
  const categoryMap = {
    'sell': 'Sell',
    'lost-found': 'Lost/Found',
    'in-good-hands': 'In Good Hands',
    'favorite': 'Favorite',
    'my-ads': 'My Ads'
  };
  
  return categoryMap[category] || category;
};

// Форматування типу улюбленця
export const formatPetType = (type) => {
  if (!type) return '';
  
  const typeMap = {
    'dog': 'Dog',
    'cat': 'Cat'
  };
  
  return typeMap[type] || type;
};

// Форматування статі улюбленця
export const formatPetGender = (gender) => {
  if (!gender) return '';
  
  const genderMap = {
    'male': 'Male',
    'female': 'Female'
  };
  
  return genderMap[gender] || gender;
};

// Форматування локації
export const formatLocation = (location) => {
  if (!location) return '';
  
  return location
    .split(',')
    .map(part => part.trim())
    .filter(part => part)
    .join(', ');
};

// Форматування коментаря (обрізання довгих текстів)
export const formatComment = (comment, maxLength = 100) => {
  if (!comment) return '';
  
  if (comment.length <= maxLength) {
    return comment;
  }
  
  return comment.substring(0, maxLength) + '...';
};

// Форматування заголовка (обрізання довгих текстів)
export const formatTitle = (title, maxLength = 50) => {
  if (!title) return '';
  
  if (title.length <= maxLength) {
    return title;
  }
  
  return title.substring(0, maxLength) + '...';
};

// Форматування URL для відображення
export const formatUrl = (url) => {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url);
    return urlObj.hostname + urlObj.pathname;
  } catch {
    return url;
  }
};

// Форматування часу
export const formatTime = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return '';
  }
};

// Форматування повної дати та часу
export const formatDateTime = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return '';
  }
};
