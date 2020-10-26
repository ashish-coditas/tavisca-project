import { FormBuilder } from '@angular/forms'
import { of } from 'rxjs'

export class StoreMocks {
     public static getMockStoreService = () => {
          return {
               dispatch: jest.fn(() => { }),
               pipe: jest.fn(() => of({})),
               select: jest.fn(() => of({ })),
          }
     };

     public static getApiService = () => {
          return {
               login: jest.fn((user) => { }),
               register: jest.fn((user) => { }),
               setToken: jest.fn((token, email) => { }),
               getToken: jest.fn(() => {
                    return {
                         "email": "abc@gmail.com",
                         "token":"hsdjfhksdbfkjs"
                    }
                }),
               removeToken: jest.fn(() => { }),
          }
     };

     public static getBookService = () => {
          return {
               getBook: jest.fn(() => {
                    return of([
                         {
                         id: "EA4JwK6",
                         title: "fd",
                         subtitle: "fdg",
                         author: "fdg",
                         published: "fdgfdg",
                         publisher: "fdgdfg",
                         pages: "fgdfgdf",
                         description: "fdgdf",
                         website: "fdgdf",
                         createdBy: "abc@gmail.com"
                         }
                    ])
               }),
               updateBookData: jest.fn((data) => of({})),
               getBookById: jest.fn((id) => { }),
               deleteBookById: jest.fn((id) => { }),
               addBookData: jest.fn((data) => of({ })),
          }
     };
}