import { CreateProductDTO, Product, UpdateProductDTO } from './../models/product.model';
import { generateManyProducts,generateOneProduct } from './../models/product.mock';
import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpStatusCode } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { TokenService } from './token.service.spec';


describe('ProductService', () => {
    // let httpClient: HttpClient;
    
    let httpTestingController: HttpTestingController;
    let productService: ProductsService;
    let tokenService : TokenService;

    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[
                ProductsService,
                {
                  provide:HTTP_INTERCEPTORS, useClass :TokenInterceptor, multi:true
                }
            ],
        });
        productService = TestBed.inject(ProductsService);
        // httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        tokenService = TestBed.inject(TokenService);
      });

      afterEach(() => {
        httpTestingController.verify();
      });

      it('should be created', () => {
        expect(productService).toBeTruthy();
      });
      

      describe('test for getAllSimple',() =>{
        it('should return a product list',(doneFn) =>{
          //Arrange
          const mockData :Product[] = generateManyProducts();
          //Act
          productService.getAllSimple().
          subscribe((data) =>{
            expect( data).toEqual(mockData);
            doneFn();
          });
          //http config
          const req = httpTestingController.expectOne('https://api.escuelajs.co/api/v1/products');
          req.flush(mockData);
        });
      });

      describe('test for getAll',() =>{
        it('should return a product list',(doneFn) =>{
          //Arrange
          const mockData :Product[] = generateManyProducts();
          //Act
          productService.getAll().
          subscribe((data) =>{
            expect( data.length).toEqual(mockData.length);
            doneFn();
          });
          //http config
          const req = httpTestingController.expectOne('https://api.escuelajs.co/api/v1/products/');
          req.flush(mockData);
        });

        it('should return product list whit taxes',(doneFn) =>{
          const mockData: Product[] = [
            {
              ...generateOneProduct(),
              price:100, // 100*.19 = 19
            },
            {
              ...generateOneProduct(),
              price:200, // 200*.19 = 38
            }
            
          ];
          productService.getAll().
            subscribe((data) =>{
              expect( data.length).toEqual(mockData.length);
              expect( data[0].taxes).toEqual(19);
              expect( data[1].taxes).toEqual(38);
              doneFn();
            });
            //http config
            const req = httpTestingController.expectOne('https://api.escuelajs.co/api/v1/products/');
            req.flush(mockData);
        });
      });

      it('should return product list width taxes', (doneFn) => {
        // Arrange
        const mockData: Product[] = [
          {
            ...generateOneProduct(),
            price: 100, //100 * .19 = 19
          },
          {
            ...generateOneProduct(),
            price: 200, //200 * .19 = 38
          },
          {
            ...generateOneProduct(),
            price: 0, //0 * .19 = 0
          },
          {
            ...generateOneProduct(),
            price: -100, // = 0
          },
        ];
        //Act
        productService.getAll()
        .subscribe((data) => {
          //Assert
          expect(data.length).toEqual(mockData.length);
          expect(data[0].taxes).toEqual(19);
          expect(data[1].taxes).toEqual(38);
          expect(data[2].taxes).toEqual(0);
          expect(data[3].taxes).toEqual(0);
          doneFn();
        });
         //http config
         const url = `https://api.escuelajs.co/api/v1/products/`;
         const req = httpTestingController.expectOne(url);
         req.flush(mockData);
      });
  
      it('should send query params width limit 10 offset 3', (doneFn) => {
        //Arrange
        const mockData: Product[] = generateManyProducts(3);
        const limit = 10;
        const offset = 3;
        //Act
        productService.getAll(limit, offset)
        .subscribe((data) => {
          //Assert
          expect(data.length).toEqual(mockData.length);
          doneFn();
        });
        //http config
        const url = `https://api.escuelajs.co/api/v1/products/?limit=${limit}&offset=${offset}`;
        const req = httpTestingController.expectOne(url);
        req.flush(mockData);
        const params = req.request.params;
        expect(params.get('limit')).toEqual(`${limit}`);
        expect(params.get('offset')).toEqual(`${offset}`);
      httpTestingController
    });

    describe('test for create', () => {
      it('should return a new product', (doneFn) => {
        // Arrange
        const mockData = generateOneProduct();
        const dto: CreateProductDTO = {
          title: 'new Product',
          price: 100,
          images: ['img'],
          description: 'bla bla bla',
          categoryId: 12,
        };
        // Act
        productService.create({...dto}).subscribe((data) => {
          // Assert
          expect(data).toEqual(mockData);
          doneFn();
        });
        //http config
        const url = `https://api.escuelajs.co/api/v1/products/`;
        const req = httpTestingController.expectOne(url);
        req.flush(mockData);
        expect(req.request.body).toEqual(dto);
        expect(req.request.method).toEqual('POST');
      });
  });

    describe('test for update', () => {
      it('should return an updated product', (doneFn) => {
        // Arrange
        const mockData = generateOneProduct();
        const id = '1';
        const dto: UpdateProductDTO = {
          title: 'update Product',
          price: 200,
          images: ['img'],
          description: 'bla bla bla bla',
          categoryId: 12,
        };
        // Act
        productService.update(id, {...dto}).subscribe((data) => {
          // Assert
          expect(data).toEqual(mockData);
          doneFn();
        });
        //http config
        const url = `https://api.escuelajs.co/api/v1/products/${id}`;
        const req = httpTestingController.expectOne(url);
        req.flush(mockData);
        expect(req.request.body).toEqual(dto);
        expect(req.request.method).toEqual('PUT');
      });
  });

    describe('test for delete', () => {
      it('should delete a product', (doneFn) => {
        // Arrange
        const id = '1';
        // Act
        productService.delete(id).subscribe((data) => {
          // Assert
          expect(data).toBe(true);
          doneFn();
        });
        //http config
        const url = `https://api.escuelajs.co/api/v1/products/${id}`;
        const req = httpTestingController.expectOne(url);
        req.flush(true);
        expect(req.request.method).toEqual('DELETE');
      });
  });

  it('should return a product', (doneFn) => {
    // Arrange
    const mockData: Product = generateOneProduct();
    const id = '1';
    // Act
    productService.getOne(id).subscribe((data) => {
      // Assert
      expect(data).toEqual(mockData);
      doneFn();
    });
    //http config
    const url = `https://api.escuelajs.co/api/v1/products/${id}`;
    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toEqual('GET');
  });

  it('should return the right msg when the status code is 404', (doneFn) => {
    // Arrange
    const id = '1';
    const msgError = '404 message';
    const mockError = {
      status: HttpStatusCode.NotFound,
      statusText: msgError,
    };
    // Act
    productService.getOne(id).subscribe({
      error: (error) => {
        // assert
        expect(error).toEqual('El producto no existe');
        doneFn();
      },
    });
    //http config
    const url = `https://api.escuelajs.co/api/v1/products/${id}`;
    const req = httpTestingController.expectOne(url);
    req.flush(msgError, mockError);
    expect(req.request.method).toEqual('GET');
  });

  it('should return the right msg when the status code is 409', (doneFn) => {
    // Arrange
    const id = '1';
    const msgError = '409 message';
    const mockError = {
      status: HttpStatusCode.Conflict,
      statusText: msgError,
    };
    // Act
    productService.getOne(id).subscribe({
      error: (error) => {
        // assert
        expect(error).toEqual('Algo esta fallando en el server');
        doneFn();
      },
    });
    //http config
    const url = `https://api.escuelajs.co/api/v1/products/${id}`;
    const req = httpTestingController.expectOne(url);
    req.flush(msgError, mockError);
    expect(req.request.method).toEqual('GET');
  });

  it('should return the right msg when the status code is 401', (doneFn) => {
    // Arrange
    const id = '1';
    const msgError = '409 message';
    const mockError = {
      status: HttpStatusCode.Unauthorized,
      statusText: msgError,
    };
    // Act
    productService.getOne(id).subscribe({
      error: (error) => {
        // assert
        expect(error).toEqual('No estas permitido');
        doneFn();
      },
    });
    //http config
    const url = `https://api.escuelajs.co/api/v1/products/${id}`;
    const req = httpTestingController.expectOne(url);
    req.flush(msgError, mockError);
    expect(req.request.method).toEqual('GET');
  });

  describe('tests for getAllSimple token', () => {
    it('should return a product list', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(2);
      spyOn(tokenService, 'getToken').and.returnValue('123');
      //Act
      productService.getAllSimple()
      .subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
        doneFn();
      });
      //http config
      const url = `https://api.escuelajs.co/api/v1/products`;
      const req = httpTestingController.expectOne(url);
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual(`Bearer 123`);
      req.flush(mockData);
    });
  });
});

    