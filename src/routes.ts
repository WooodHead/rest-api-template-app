/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './Services/Users/AuthController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsersController } from './Services/Users/UsersController';
import { koaAuthentication } from './middleware/authentication';
import * as KoaRouter from 'koa-router';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "User": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "username": { "dataType": "string", "required": true },
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Registration": {
        "dataType": "refObject",
        "properties": {
            "username": { "dataType": "string", "required": true },
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Login": {
        "dataType": "refObject",
        "properties": {
            "username": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasePageResultUser": {
        "dataType": "refObject",
        "properties": {
            "count": { "dataType": "double", "required": true },
            "page": { "dataType": "double" },
            "limit": { "dataType": "double" },
            "items": { "dataType": "array", "array": { "ref": "User" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateUser": {
        "dataType": "refObject",
        "properties": {
            "firstName": { "dataType": "string" },
            "lastName": { "dataType": "string" },
            "email": { "dataType": "string" },
            "role": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(router: KoaRouter) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    router.post('/api/auth/registration',
        async (context: any, next: any) => {
            const args = {
                body: { "in": "body", "name": "body", "required": true, "ref": "Registration" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new AuthController();

            const promise = controller.registration.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.post('/api/auth/login',
        async (context: any, next: any) => {
            const args = {
                body: { "in": "body", "name": "body", "required": true, "ref": "Login" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new AuthController();

            const promise = controller.login.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.get('/api/users',
        async (context: any, next: any) => {
            const args = {
                page: { "in": "query", "name": "page", "dataType": "double" },
                limit: { "in": "query", "name": "limit", "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new UsersController();

            const promise = controller.getAllUsers.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.get('/api/users/:id',
        authenticateMiddleware([{ "jwt": ["Admin"] }]),
        async (context: any, next: any) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new UsersController();

            const promise = controller.getUserById.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.put('/api/users/:id',
        async (context: any, next: any) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "UpdateUser" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new UsersController();

            const promise = controller.updateUser.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    router.delete('/api/users/:id',
        authenticateMiddleware([{ "jwt": ["Admin"] }]),
        async (context: any, next: any) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new UsersController();

            const promise = controller.deleteUser.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async (context: any, next: any) => {
            let responded = 0;
            let success = false;

            const succeed = async (user: any) => {
                if (!success) {
                    success = true;
                    responded++;
                    context.request['user'] = user;
                    await next();
                }
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            const fail = async (error: any) => {
                responded++;
                if (responded == security.length && !success) {
                    // this is an authentication error
                    context.status = error.status || 401;
                    context.throw(context.status, error.message, error);
                } else if (success) {
                    // the authentication was a success but arriving here means the controller
                    // probably threw an error that we caught as well
                    // so just pass it on
                    throw error;
                }
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    let promises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        promises.push(koaAuthentication(context.request, name, secMethod[name]));
                    }

                    return Promise.all(promises)
                        .then((users) => succeed(users[0]))
                        .catch(fail);
                } else {
                    for (const name in secMethod) {
                        return koaAuthentication(context.request, name, secMethod[name])
                            .then(succeed)
                            .catch(fail);
                    }
                }
            }
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: Promise<any>, context: any, next: () => Promise<any>) {
        return Promise.resolve(promise)
            .then((data: any) => {
                if (data || data === false) {
                    context.body = data;
                    context.status = 200;
                } else {
                    context.status = 204;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                if (isController(controllerObj)) {
                    const headers = controllerObj.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        context.set(name, headers[name]);
                    });

                    const statusCode = controllerObj.getStatus();
                    if (statusCode) {
                        context.status = statusCode;
                    }
                }
                return next();
            })
            .catch((error: any) => {
                context.status = error.status || 500;
                context.throw(context.status, error.message, error);
            });
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, context: any): any[] {
        const errorFields: FieldErrors = {};
        const values = Object.keys(args).map(key => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return context.request;
                case 'query':
                    return validationService.ValidateParam(args[key], context.request.query[name], name, errorFields, undefined, { "noImplicitAdditionalProperties": "throw-on-extras", "specVersion": 3 });
                case 'path':
                    return validationService.ValidateParam(args[key], context.params[name], name, errorFields, undefined, { "noImplicitAdditionalProperties": "throw-on-extras", "specVersion": 3 });
                case 'header':
                    return validationService.ValidateParam(args[key], context.request.headers[name], name, errorFields, undefined, { "noImplicitAdditionalProperties": "throw-on-extras", "specVersion": 3 });
                case 'body':
                    return validationService.ValidateParam(args[key], context.request.body, name, errorFields, name + '.', { "noImplicitAdditionalProperties": "throw-on-extras", "specVersion": 3 });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], context.request.body[name], name, errorFields, 'body.', { "noImplicitAdditionalProperties": "throw-on-extras", "specVersion": 3 });
            }
        });
        if (Object.keys(errorFields).length > 0) {
            throw new ValidateError(errorFields, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
