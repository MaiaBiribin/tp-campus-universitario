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
exports.AulasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let AulasController = class AulasController {
    getAulas() {
        return 'aqui se verán las aulas';
    }
    createAulas() {
        return '';
    }
    patchAulas() {
        return '';
    }
    putAulas() {
        return '';
    }
    deleteAulas() {
        return '';
    }
};
exports.AulasController = AulasController;
__decorate([
    (0, swagger_1.ApiTags)('Aulas'),
    (0, common_1.Get)('/aulas/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Devuelve lo que contenga el aula' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AulasController.prototype, "getAulas", null);
__decorate([
    (0, swagger_1.ApiTags)('Aulas'),
    (0, common_1.Post)('/aulas'),
    (0, swagger_1.ApiOperation)({ summary: 'Crea una nueva aula' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AulasController.prototype, "createAulas", null);
__decorate([
    (0, swagger_1.ApiTags)('Aulas'),
    (0, common_1.Patch)('/aulas/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Modifica parcialmente los datos de un aula' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AulasController.prototype, "patchAulas", null);
__decorate([
    (0, swagger_1.ApiTags)('Aulas'),
    (0, common_1.Put)('/aulas/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Reemplaza completamente los datos de un aula' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AulasController.prototype, "putAulas", null);
__decorate([
    (0, swagger_1.ApiTags)('Aulas'),
    (0, common_1.Delete)('/aulas/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Elimina un aula' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AulasController.prototype, "deleteAulas", null);
exports.AulasController = AulasController = __decorate([
    (0, common_1.Controller)('/')
], AulasController);
//# sourceMappingURL=aulas.controller.js.map