import CreateCategoryModal from './CreateCategoryModal';

const ManageCategories = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">Manage Categories</h2>
        <CreateCategoryModal />
      </div>
    </div>
  );
};

export default ManageCategories;
