# Thunder Client API Testing Report

## Project

Student Management System

## Testing Tool

Thunder Client (VS Code Extension)

---

## Tested APIs

### 1. Create Student

**Method:** POST

**Endpoint:**

```http
/api/students
```

**Status:**
201 Created ✅

**Result:**
Student record successfully added to database.

---

### 2. Get All Students

**Method:** GET

**Endpoint:**

```http
/api/students
```

**Status:**
200 OK ✅

**Result:**
Retrieved all student records successfully.

---

### 3. Get Student By ID

**Method:** GET

**Endpoint:**

```http
/api/students/:id
```

**Status:**
200 OK ✅

**Result:**
Retrieved student details along with marks.

---

### 4. Update Student

**Method:** PUT

**Endpoint:**

```http
/api/students/:id
```

**Status:**
200 OK ✅

**Result:**
Student information updated successfully.

---

### 5. Delete Student

**Method:** DELETE

**Endpoint:**

```http
/api/students/:id
```

**Status:**
200 OK ✅

**Result:**
Student record deleted successfully.

---

### 6. Add Marks

**Method:** POST

**Endpoint:**

```http
/api/marks
```

**Status:**
201 Created ✅

**Result:**
Marks added successfully for the selected student.

---

### 7. Pagination Testing

**Method:** GET

**Endpoint:**

```http
/api/students?page=1&limit=5
```

**Status:**
200 OK ✅

**Result:**
Paginated student records returned successfully with:

* Total Records
* Current Page
* Total Pages

---

## Validation Testing

### Empty Name

Status: 400 Bad Request ✅

### Invalid Email

Status: 400 Bad Request ✅

### Invalid Age

Status: 400 Bad Request ✅

### Invalid Marks

Status: 400 Bad Request ✅

---

## Conclusion

All APIs were successfully tested using Thunder Client. CRUD operations, pagination, validations, and marks management functionality are working correctly.
