import { FormBuilder } from '@angular/forms'
import { of } from 'rxjs'

export class StoreMocks {
     public static getMockStoreService = () => {
        return {
                dispatch: jest.fn(() => {}),
                pipe: jest.fn(() => of({}))
           }
     }
}