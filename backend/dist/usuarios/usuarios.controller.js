"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let UsuariosController = class UsuariosController {
    getEventos() {
        return '';
    }
    postEventos() {
        return '';
    }
    patchUsuarios() {
        return '';
    }
    putUsuarios() {
        return '';
    }
    deleteUsuarios() {
        return '';
    }
};
exports.UsuariosController = UsuariosController;
__decorate([
    (0, swagger_1.ApiTags)('Usuarios'),
    (0, common_1.Get)('/usuarios/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Devuelve los datos de un usuario' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "getEventos", null);
__decorate([
    (0, swagger_1.ApiTags)('Usuarios'),
    (0, common_1.Post)('/usuarios'),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un nuevo usuario' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "postEventos", null);
__decorate([
    (0, swagger_1.ApiTags)('Usuarios'),
    (0, common_1.Patch)('/usuarios/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Modifica parcialmente un usuario' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "patchUsuarios", null);
__decorate([
    (0, swagger_1.ApiTags)('Usuarios'),
    (0, common_1.Put)('/usuarios/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Reemplaza completamente un usuario' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "putUsuarios", null);
__decorate([
    (0, swagger_1.ApiTags)('Usuarios'),
    (0, common_1.Delete)('/usuarios/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Elimina un usuario' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "deleteUsuarios", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, common_1.Controller)('/')
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map