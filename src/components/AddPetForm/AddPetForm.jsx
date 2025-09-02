import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useNotification } from '../../contexts/useNotification';
import { addPetSchema } from '../../utils/validationSchemas';
import css from './AddPetForm.module.css';

function AddPetForm() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addPetSchema),
    defaultValues: {
      title: '',
      name: '',
      imgUrl: '',
      species: '',
      birthday: '',
      sex: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Відправляємо дані на backend
      await api.addPet(data);

      // Показуємо notification про успіх
      showSuccess('Pet added successfully!');

      // Перенаправляємо на профіль
      navigate('/profile');
    } catch (error) {
      console.error('Error adding pet:', error);
      const errorMessage =
        error.message ||
        'An error occurred while adding your pet. Please try again.';

      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/profile');
  };

  return (
    <div className={css.formContainer}>
      <h2 className={css.formTitle}>Add Pet</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.fieldGroup}>
          <label className={css.label} htmlFor="title">
            Title *
          </label>
          <input
            id="title"
            type="text"
            className={`${css.input} ${errors.title ? css.inputError : ''}`}
            placeholder="Enter pet title"
            {...register('title')}
          />
          {errors.title && (
            <p className={css.errorMessage}>{errors.title.message}</p>
          )}
        </div>

        <div className={css.fieldGroup}>
          <label className={css.label} htmlFor="name">
            Name *
          </label>
          <input
            id="name"
            type="text"
            className={`${css.input} ${errors.name ? css.inputError : ''}`}
            placeholder="Enter pet name"
            {...register('name')}
          />
          {errors.name && (
            <p className={css.errorMessage}>{errors.name.message}</p>
          )}
        </div>

        <div className={css.fieldGroup}>
          <label className={css.label} htmlFor="imgUrl">
            Image URL *
          </label>
          <input
            id="imgUrl"
            type="url"
            className={`${css.input} ${errors.imgUrl ? css.inputError : ''}`}
            placeholder="https://example.com/pet-image.jpg"
            {...register('imgUrl')}
          />
          {errors.imgUrl && (
            <p className={css.errorMessage}>{errors.imgUrl.message}</p>
          )}
        </div>

        <div className={css.fieldGroup}>
          <label className={css.label} htmlFor="species">
            Species *
          </label>
          <input
            id="species"
            type="text"
            className={`${css.input} ${errors.species ? css.inputError : ''}`}
            placeholder="Enter pet species"
            {...register('species')}
          />
          {errors.species && (
            <p className={css.errorMessage}>{errors.species.message}</p>
          )}
        </div>

        <div className={css.fieldGroup}>
          <label className={css.label} htmlFor="birthday">
            Birthday *
          </label>
          <input
            id="birthday"
            type="date"
            className={`${css.input} ${errors.birthday ? css.inputError : ''}`}
            {...register('birthday')}
          />
          {errors.birthday && (
            <p className={css.errorMessage}>{errors.birthday.message}</p>
          )}
        </div>

        <div className={css.fieldGroup}>
          <label className={css.label}>Sex *</label>
          <div className={css.radioGroup}>
            <label className={css.radioLabel}>
              <input
                type="radio"
                value="male"
                {...register('sex')}
                className={css.radioInput}
              />
              <span className={css.radioText}>Male</span>
            </label>
            <label className={css.radioLabel}>
              <input
                type="radio"
                value="female"
                {...register('sex')}
                className={css.radioInput}
              />
              <span className={css.radioText}>Female</span>
            </label>
          </div>
          {errors.sex && (
            <p className={css.errorMessage}>{errors.sex.message}</p>
          )}
        </div>

        <div className={css.formActions}>
          <button
            type="button"
            onClick={handleBack}
            className={css.backBtn}
            disabled={isSubmitting}
          >
            Back
          </button>
          <button
            type="submit"
            className={css.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPetForm;
