export const categoryToOptions = (category) => ({
  value: category._id,
  label: category.title,
});

export const filterCategories = (inputValue, categoriesData) => {
  const filteredOptions = categoriesData
    .map(categoryToOptions)
    .filter((category) =>
      category.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  return filteredOptions;
};
