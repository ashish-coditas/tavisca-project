import { FormBuilder } from '@angular/forms'
import { of } from 'rxjs'

export class StoreMocks {

    public static getThemeServiceMock = () => {
        return {
            isDarkTheme: jest.fn(() => false),
            setDarkTheme: jest.fn(() => {}),
            setLightTheme: jest.fn(() => {}),
            setActiveTheme: jest.fn(() => {})
         }
        
     }

     public static getMockUserService = () => {
        return {
            getUser: jest.fn(() => {
                return [
                    {
                        "id": "9781449331818",
                        "title": "Learning JavaScript Design Patterns",
                        "subtitle": "A JavaScript and jQuery Developer's Guide",
                        "author": "Addy",
                        "published": "2012-07-01T00:00:00.000Z",
                        "publisher": "O'Reilly Media",
                        "pages": 254,
                        "description": "With",
                        "website": "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/",
                        "createdBy": "kapri@gmail.com"
                    }
                ]
            }),
            updateUser: jest.fn(() => {
                return [
                    {
                        "id": "9781449331818",
                        "title": "Learning JavaScript Design Patterns",
                        "subtitle": "A JavaScript and jQuery Developer's Guide",
                        "author": "Addy",
                        "published": "2012-07-01",
                        "publisher": "O'Reilly Media",
                        "pages": 254,
                        "description": "With",
                        "website": "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/",
                        "createdBy": "kapri@gmail.com"
                    }
                ]
            }),
            deleteUser: jest.fn(() => {
                return [
                    {
                        "id": "9781449331818",
                        "title": "Learning JavaScript Design Patterns",
                        "subtitle": "A JavaScript and jQuery Developer's Guide",
                        "author": "Addy",
                        "published": "2012-07-01",
                        "publisher": "O'Reilly Media",
                        "pages": 254,
                        "description": "With",
                        "website": "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/",
                        "createdBy": "kapri@gmail.com"
                    }
                ]
            }),
            addUser: jest.fn(() => {
                return [
                    {
                        "id": "9781449331818",
                        "title": "Learning JavaScript Design Patterns",
                        "subtitle": "A JavaScript and jQuery Developer's Guide",
                        "author": "Addy",
                        "published": "2012-07-01T00:00:00.000Z",
                        "publisher": "O'Reilly Media",
                        "pages": 254,
                        "description": "With",
                        "website": "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/",
                        "createdBy": "kapri@gmail.com"
                    }
                ]
            })
         }
     }

     public static getMockRouterService = () => {
        return {
            navigate: jest.fn((nav) => {})
           }
     }

     public static getMockStoreService = () => {
        return {
                dispatch: jest.fn(() => {}),
                pipe: jest.fn(() => of({}))
           }
     }

     public static getMockAppService = () => {
        return {
            isAuthenticated: jest.fn(() => {})
           }
    }

    public static getMockFormGroup = () => {
        const myModel = {
            valid: true,
            value: null
         };
         const fb = new FormBuilder();
         return fb.group(myModel);
    }

    public static getMockApiService = () => {
        return {
            login: jest.fn(() => false),
            register: jest.fn(() => {}),
           }
    }
}