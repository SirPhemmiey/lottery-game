### Things to note

- Please see the Postman collection here: https://documenter.getpostman.com/view/3683187/UVXqEXte

- I have used the [PBF Approach](https://phauer.com/2020/package-by-feature/) for structing the project

- Application of JSend Specification: See [here](https://github.com/omniti-labs/jsend) or anything similar. It's a speficification that allows you to send API response in a consistent and readable matter. It has three 2-3 compulsory field names.

```
    {
        status: "success",
        statusCode: 200 //this is optional though because it can be gotten from the header
        data: {
            keys: []
        }
    }
```
- Some Design patterns were used (`Singleton`, `Facade`, `Strategic pattern`)

- Application of some SOLID principles were applied. For instance, `Single Responsibility Principle`, `Dependency Inversion`

- Dependency Injection principle and Dependency Injection container was used

- API versioning was used because it helps us to iterate faster when the needed changes are identified in the APIs. Versioning could be by URL or using a custom request header. It's a good practice to have it implemented in production-ready APIs.

- Abstraction was heavily used. This is evident in a couple of places, 

 - like how the `env.ts` file gets the enviroment variables and then makes it available for whichever service or components needs it.
 - like how the `LotteryService` does not directly depend on any object or lower(higher)-level service(s). And with this approach our service is not tightly coupled to use just one specific database or datasource. 

- `src/services` contains the service(s) and also the DAOs (Data access objects) which helps abstracts the complexity of services directly making database calls but instead an indirection (`Dependency Inversion`).

- Separation of concerns and layering components: Service does not directly make database calls but instead should be moved to a controller. Services, Routes, Controllers, DAOs, Database Queries are all seperated as "components" and injected into which ever service needs it. 

- The `Repository` design pattern was used. This is evident where we have all the database calls are in a file and an interface is used to interact with it from the outside. 


- OOP Paradigm was used. Notable ones are `Polymorphism` (using `implement`) and `Inheritance` (using `extends`)

- Unit testing was done on all business requirements.

- `Boom` was used. It provides a set of utilities for returning HTTP friendly errors in a large scale system