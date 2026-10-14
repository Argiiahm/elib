import CategoryCard from '../../../components/CategoryCard';
import UserLayouts from '../components/UserLayouts';
import useCategories from '../../../hooks/useCategories';
import InputSearch from '../../../components/ui/input/search/InputSearch';

const CategoriesPage = () => {
  const categories = useCategories();
  return (
    <UserLayouts>
      <div className="m-10">
        <h1 className="text-3xl font-medium">
          Find Your Favorites{' '}
          <span className="font-bold text-orange-500">Categories</span>
        </h1>
        <p className="text-gray-500">
          Every book has a story to tell, and we're here to help you find the
          ones that match your interests.
        </p>
        <div className="mt-10">
          <InputSearch placeholder="Search categoryName, more" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </UserLayouts>
  );
};

export default CategoriesPage;
