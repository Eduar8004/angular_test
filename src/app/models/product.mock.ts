import { faker } from '@faker-js/faker';
import { Product } from './../models/product.model';
 export const generateOneProduct = ():Product => {
    return{
        id:faker.string.uuid(),
        title: faker.commerce.productName(),
        price:parseInt(faker.commerce.price()) ,
        images:[faker.image.urlPicsumPhotos(),faker.image.urlPicsumPhotos()],
        description:faker.commerce.productDescription(),
        category:{id:faker.number.int(),
        name:faker.commerce.department()
        }
    } 
 }

 export const generateManyProducts = (size = 10):Product[]=> {
    const products:Product[] = [];
    for (let index = 0; index < size; index++) {
        products.push(generateOneProduct());
        
    }
    return [...products];
}