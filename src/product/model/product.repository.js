import ProductModel from "./product.schema.js";

export const addNewProductRepo = async (product) => {
  return await new ProductModel(product).save();
};

export const getAllProductsRepo = async (page,keyword,category,pricegte,pricelte,ratinggte,ratinglte) => {
  const filters={};
  if(keyword){
    filters.name= { $regex: keyword, $options: 'i' }
  }
  if(category){
    filters.category=category
  }
  if(pricegte){
    filters.price={};
    filters.price.$gte=pricegte
  }
  if(pricelte){
    filters.price = filters.price || {};
   filters.price.$lte=pricelte
  }
  if(ratinggte){
    filters.rating={};
    filters.rating.$gte=ratinggte
  }
  if(ratinglte){
    filters.rating = filters.rating || {};
   filters.rating.$lte=ratinglte
  }

  if(page){
    const skipItems=(page-1)*10;
    return await ProductModel.find(filters).skip(skipItems).limit(10)
  }else{
    return await  ProductModel.find(filters);
  }
  
};

export const updateProductRepo = async (_id, updatedData) => {
  return await ProductModel.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
};

export const deleProductRepo = async (_id) => {
  return await ProductModel.findByIdAndDelete(_id);
};

export const getProductDetailsRepo = async (_id) => {
  return await ProductModel.findById(_id);
};

export const getTotalCountsOfProduct = async () => {
  return await ProductModel.countDocuments();
};

export const findProductRepo = async (productId) => {
  return await ProductModel.findById(productId);
};
