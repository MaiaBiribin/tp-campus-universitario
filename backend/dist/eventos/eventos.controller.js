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
exports.EventosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let EventosController = class EventosController {
    getEventos() {
        return '';
    }
    postEventos() {
        return '';
    }
    patchEventos() {
        return '';
    }
    putEventos() {
        return '';
    }
    deleteEventos() {
        return '';
    }
};
exports.EventosController = EventosController;
__decorate([
    (0, swagger_1.ApiTags)('Eventos'),
    (0, common_1.Get)('/eventos/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Devuelve el evento, ya sea de tipo clase, parcial, o informativo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventosController.prototype, "getEventos", null);
__decorate([
    (0, swagger_1.ApiTags)('Eventos'),
    (0, common_1.Post)('/eventos'),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un nuevo evento, ya sea de tipo clase, parcial, o informativo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventosController.prototype, "postEventos", null);
__decorate([
    (0, swagger_1.ApiTags)('Eventos'),
    (0, common_1.Patch)('/eventos/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Modifica parcialmente un evento, ya sea de tipo clase, parcial, o informativo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventosController.prototype, "patchEventos", null);
__decorate([
    (0, swagger_1.ApiTags)('Eventos'),
    (0, common_1.Put)('/eventos/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Reemplaza completamente un evento, ya sea de tipo clase, parcial, o informativo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventosController.prototype, "putEventos", null);
__decorate([
    (0, swagger_1.ApiTags)('Eventos'),
    (0, common_1.Delete)('/eventos/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Elimina un evento, ya sea de tipo clase, parcial, o informativo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventosController.prototype, "deleteEventos", null);
exports.EventosController = EventosController = __decorate([
    (0, common_1.Controller)('/')
], EventosController);
//# sourceMappingURL=eventos.controller.js.map