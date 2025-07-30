# ShopTrace Backend

Este backend utiliza **Node.js**, **Express** y **Sequelize** con **PostgreSQL** para la gestión de usuarios, tareas, ventas e inventario.

## Endpoints y ejemplos de uso con `curl`

---

### Usuarios

- **Crear usuario**
  ```bash
  curl -X POST http://localhost:4000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan","email":"juan@ejemplo.com","password":"1234","role":"admin"}'
  ```

- **Listar usuarios**
  ```bash
  curl http://localhost:4000/api/users
  ```

- **Actualizar usuario**
  ```bash
  curl -X PUT http://localhost:4000/api/users/ID \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Actualizado"}'
  ```

- **Eliminar usuario**
  ```bash
  curl -X DELETE http://localhost:4000/api/users/ID
  ```

---

### Tareas

- **Crear tarea**
  ```bash
  curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Reponer góndola","description":"Reponer productos en góndola"}'
  ```

- **Listar tareas**
  ```bash
  curl http://localhost:4000/api/tasks
  ```

- **Actualizar tarea**
  ```bash
  curl -X PUT http://localhost:4000/api/tasks/ID \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
  ```

- **Eliminar tarea**
  ```bash
  curl -X DELETE http://localhost:4000/api/tasks/ID
  ```

---

### Ventas

- **Crear venta**
  ```bash
  curl -X POST http://localhost:4000/api/sales \
  -H "Content-Type: application/json" \
  -d '{"product":"Coca Cola 600ml","quantity":2,"total":37}'
  ```

- **Listar ventas**
  ```bash
  curl http://localhost:4000/api/sales
  ```

- **Actualizar venta**
  ```bash
  curl -X PUT http://localhost:4000/api/sales/ID \
  -H "Content-Type: application/json" \
  -d '{"quantity":3,"total":55.5}'
  ```

- **Eliminar venta**
  ```bash
  curl -X DELETE http://localhost:4000/api/sales/ID
  ```

---

### Inventario

- **Crear producto**
  ```bash
  curl -X POST http://localhost:4000/api/inventory \
  -H "Content-Type: application/json" \
  -d '{"name":"Pepsi 500ml","description":"Bebida","quantity":15,"price":17.5,"minStock":5}'
  ```

- **Listar productos**
  ```bash
  curl http://localhost:4000/api/inventory
  ```

- **Actualizar producto**
  ```bash
  curl -X PUT http://localhost:4000/api/inventory/ID \
  -H "Content-Type: application/json" \
  -d '{"quantity":20,"price":18.0}'
  ```

- **Eliminar producto**
  ```bash
  curl -X DELETE http://localhost:4000/api/inventory/ID
  ```

---

> Reemplaza `ID` por el identificador real del recurso que quieras modificar o eliminar.