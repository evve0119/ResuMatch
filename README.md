# **Final Report: ResuMatch**
**Development Team:**

```text
Saud Badar     | 1002554595 | saud.badar@mail.utoronto.ca
Chao-Lin Chen  | 1009582186 | chaolin.chen@mail.utoronto.ca
Wedong Li      | 1010285683 | wendong.li@mail.utoronto.ca
Phyllis Wu     | 1007522968 | phyllis.wu@mail.utoronto.ca
```

# **1\. Motivation**

The motivation behind the development of ResuMatch stems from a prevalent and impactful issue faced by modern job seekers: the challenge of efficiently tailoring resumes to specific job descriptions. In the current employment landscape, applicants are often required to customize their resumes for each role in order to meet recruiter expectations and pass Applicant Tracking Systems (ATS). This process is not only time-intensive but also cognitively demanding, requiring individuals to continuously re-evaluate their professional experiences and adjust formatting to align with varied job requirements.

As early-career professionals, the members of our development team have directly experienced the burden of manual resume customization while simultaneously managing other job-seeking responsibilities such as technical interview preparation, networking, and continuous skill development. Existing tools—ranging from word processors and static resume templates to modern resume builders and ATS optimization platforms—fail to provide comprehensive support for intelligent content selection. Most rely on user-driven inputs and offer limited guidance for highlighting the most relevant qualifications. Consequently, users may either overlook key experiences or produce generic resumes that diminish their competitiveness in the job market.

To address this gap, ResuMatch proposes an AI-driven solution that automates the resume customization process by intelligently extracting and prioritizing the most relevant user data based on a given job description. This approach aims to enhance both the efficiency and effectiveness of resume generation, enabling users to produce high-quality, tailored documents with significantly reduced effort. The significance of this project lies in its potential to streamline a critical aspect of the job application process, thereby improving users' ability to secure interviews and reducing barriers to employment, particularly for students, recent graduates, and professionals undergoing career transitions.

# **2\. Objectives**

The primary objective of the *ResuMatch* was to create an AI-powered, full-stack web application that automates and enhances the resume customization process based on specific job descriptions. The project aimed to significantly reduce the manual effort involved in tailoring resumes, while improving their relevance and quality to increase a job seeker's chances of success.

1. **Enhance Resume Relevance and Quality**
   Use AI to analyze job descriptions and intelligently match them with the user’s stored professional information (education, experience, skills). Produce resumes that are tailored, keyword-optimized, and contextually relevant, increasing the likelihood of passing applicant tracking systems and engaging recruiters.
2. **Automate and Simplify Resume Customization**
   Enable users to input a job description or job URL, then generate a draft resume automatically populated with their most relevant information. Significantly reduce the time and effort typically required for manual editing.
3. **Improve Job-Seeking Efficiency**
   Help job seekers—especially students, recent graduates, and career changers—apply to multiple roles more quickly. Streamline the resume-building process so users can focus more on interviews, networking, and skill development.
4. **Demonstrate Practical AI Integration**
   Show how natural language processing and AI technologies can be integrated into resume tools to solve real-world challenges. Deliver a working solution that highlights the practical benefits of automation in job applications.

# **3\. Technical Stack**

The ResuMatch project was developed using a full-stack architecture with a React frontend and an Express.js backend, following a modular and RESTful design.

### **Backend Approach:**

The backend was built using Express.js and structured as a RESTful API. It handles user authentication, resume generation, database operations, and integration with external services.

### **Frontend Technology:**

The frontend was developed using React with Tailwind CSS for styling. React Router was used for client-side routing, and the UI design was prototyped using Figma.

### **Database Solution:**

The project uses Azure PostgreSQL (via Prisma ORM) to store user information, resume metadata, and other structured content.

### **Cloud Infrastructure:**

* Azure Static Web Apps and App Services: Frontend is deployed on Azure Static Web Apps, and backend is deployed separately on Azure App Service, communicating via Axios.
* Azure Blob Storage: Used to store generated resume files (PDFs) securely and efficiently.
* GitHub Actions: Used to implement a CI/CD pipeline for automated deployment.

### **Authentication & Security:**

Authentication was implemented using JWT-based sessions, supporting role-based access and secure communication.

### **AI Integration:**

The application integrates with the OpenAI API (GPT-4o) to analyze job descriptions and generate tailored resume content using natural language processing.

### **Other Key Technologies:**

* **Axios:** For frontend-backend API communication.
* **PDFShift:** Used to convert HTML resumes into downloadable PDF files.
* **Prisma:** An ORM used to interact with the PostgreSQL database securely and efficiently.

# **4\. Features**

## **4.1. Architecture**

A flowchart illustrating the architecture of ***ResuMatch*** is provided [here](https://drive.google.com/file/d/1Taf-2oyGKlW_JeA-TK-1WtELXsbQxsd1/view?usp=sharing).

![ResumeMatch](./image/ResumeMatch.png)

ResuMatch delivers an intelligent and user-centric solution for job seekers by combining automation, AI, and modern web development practices. These features support the project’s primary goal—automating resume customization—while meeting all core technical and advanced course requirements.

### **AI-Powered Resume Tailoring and PDF Generation**

ResuMatch leverages OpenAI’s GPT-4o to transform a candidate’s resume into a tailored document that aligns closely with a specific job description. Users simply provide a job description or a job posting description, and the system performs the following steps:

1. **Tailored Resume Generation:**
   In `tailorResume.js`, the system reads a resume in structured JSON format along with a job description text, and sends both to OpenAI’s API. The prompt instructs the model to revise the resume content—especially experiences, projects, and skills—so they better match the job description. The output is a new, tailored JSON resume with improved clarity, relevant achievements, and job-aligned language. Additionally, a concise and role-specific file title is generated using a follow-up prompt.
2. **PDF Conversion:**
   The tailored JSON resume is then transformed into a professionally formatted PDF via a multi-step process (`generateResumePDF.js`):
   1. **Template & Style Integration:**
      The generateResumePDF module reads an HTML resume template and its accompanying CSS to define the layout and visual style.
   2. **Dynamic Content Filling:**
      A prompt combining the template, CSS, and the candidate’s JSON resume data is sent to OpenAI’s API. The returned HTML document has all placeholders filled with actual data.
   3. **HTML Cleaning & PDF Generation:**
      The cleaned HTML is forwarded to PDFShift—a third-party PDF conversion service—which processes the HTML and returns a PDF buffer.
   4. **Storage:**
      Finally, the generated PDF is stored in Azure Blob Storage for secure access and distribution.

### **Secure File Handling and Storage**

All resume files are securely stored in Azure Blob Storage. Users can view, download, or delete their resumes through the application interface (`save.controller.js`, `resume.controller.js`). Preview URLs are generated using secure SAS tokens, ensuring that private resume content is not exposed unintentionally.

### **User Authentication and Data Privacy**

ResuMatch implements JWT-based authentication using Passport.js. This allows users to safely register, log in, and manage their data with role-based access controls, ensuring secure sessions and protecting personal information.

### **Frontend Experience and State Management**

The React-based frontend uses Tailwind CSS to deliver a clean design. React Router manages navigation across the app, and advanced state management ensures seamless user interactions while navigating profile data, resume previews, and generation workflows.

## **4.2. Feature Overview and Course Alignment**

| Feature | Description | Fulfills |
| :---: | :---: | :---: |
| AI Resume Tailoring | Uses OpenAI (GPT-4o) to generate resumes tailored to job descriptions. | Advanced Feature:  External API Integration |
| User Authentication | JWT-based login and session management with role-based access. | Advanced Feature:  Authentication and Authorization |
| File Handling & Storage | Resume PDFs generated via PDFShift and securely stored on Azure Blob Storage. | Core Requirement: Cloud Storage \+ Advanced Feature: File Handling |
| Profile Data Management | Full CRUD operations on user data (experience, education, skills, projects). | Core Requirement:  Relational Database (Azure PostgreSQL via Prisma ORM) |
| Frontend Framework | Responsive UI using React and Tailwind CSS. | Core Requirement:  React, Tailwind CSS |
| Modular Architecture | Separated frontend (React) and backend (Express.js) via RESTful APIs. | Option B: Separate Frontend and Backend Architecture |
| PDF Resume Generation | HTML resumes are converted to PDFs using the PDFShift API. | Advanced Feature: File Processing |
| History & Resume Preview | Users can view past resumes with auto-generated preview links. | Supports efficiency and user experience objectives |

## **4.3. Frontend Framework**

### **App Wrapper & Routing – `App.jsx`**

* Acts as the main entry point for the frontend.
* Uses React Router to define routes for all major pages:

| Route | Page | Purpose |
| ----- | ----- | ----- |
| `/` | `Home.jsx` | Home Page |
| `/login` | `Login.jsx` | User Login |
| `/signup` | `Signup.jsx` | User Signup |
| `/account` | `Account.jsx` | Enter Details (Personal Info Input) |
| `/create` | `CreateResume.jsx` | Generate Resume |
| `/saveresume` | `SavedResumes.jsx` | Saved Versions (Resume History) |

* Wraps the layout with the `Navbar` component, which is always accessible.
* Integrates context-aware navigation, supporting a fluid single-page app experience.

### **Home Page – `Home.jsx`**

* Acts as the landing page for users.
* Introduces the app and its value proposition.

### **Authentication – `Login.jsx` & `Signup.jsx`**

* Handle user login and registration.
* Connect to backend authentication (JWT-based).
* Perform form validation and manage authentication state.
* Login page includes link to Signup page, vice versa.

### **Enter Details Page – `Account.jsx`**

* Provides a structured interface for entering all resume data.
* Composed of five reusable components:

| Section | Component |
| ----- | ----- |
| Personal Details | `PersonalSection.jsx` |
| Education | `EducationSection.jsx` |
| Skills | `SkillsSection.jsx` |
| Work Experience | `ExperienceSection.jsx` |
| Projects | `ProjectsSection.jsx` |

* All sections are laid out vertically in a clean, scrollable format.
* Some sections allowed users to add more input fields (such as Education).
* Data is managed via local state/context and used during resume generation.

### **Generate Resume – `CreateResume.jsx`**

* Lets users input a job description.
* Sends data to the backend (OpenAI API) to match relevant resume entries using the GPT-4o.
* Acts as the smart automation core of ResuMatch.

### **Saved Resumes – `SavedResumes.jsx`**

* Shows a list of previously generated resume versions.
* Supports basic resume version tracking.
* Intended for users to view, download and delete for past resumes.

### **Global Navigation – `Navbar.jsx`**

* Renders top-level navigation across all pages.
* Adapts based on authentication state:
  * When logged in: shows below links

| Link | Action |
| ----- | ----- |
| resume | Direct to `SavedResumes.jsx` |
| my account | Direct to `Account.jsx` |
| sign out | Sign Out |
| craft my resume | Direct to `CreateResume.jsx` |

  * When logged out: shows below links

| Link | Action |
| ----- | ----- |
| login/signup | Direct to `Login.jsx` |
| craft my resume | Direct to `CreateResume.jsx` |

* `craft my resume` is styled as a primary action button.
* Responsive and easy to extend with future dropdowns or icons.

### **UI Highlights & Structure**

* **Styling Framework:** Tailwind CSS for pre-styled, theme-aware UI components.
* **Reusable Elements:**
  * `button.jsx` defines a flexible, themeable \<Button\> component using class-variance-authority.
  * `index.css` & `App.css` manage global styles, themes, and transitions.
* **Frontend Design Principles:**
  * Clean, scrollable layout for form-heavy input.
  * Fully modular section architecture for scalability.
  * Built for real-time interaction and future integration of user context/state.
  * Supports multi-version resume handling and export formats.

# **4.4. Data Management**

ReseMatch utilizes data management through Azure PostgreSQL and Azure Blob Storage. Below are the key features and how they contribute to the project objectives.

## **4.1. Cloud Storage Integration with Azure Blob Storage**

ReseMatch utilizes Azure Blob Storage to implement cloud-based file storage, ensuring the project can handle binary data (PDF resume files) efficiently. The details includes:

* **Resume Generation:** Tailoring and generating PDF resumes based on user-provided data.
* **File Saving:** Storing the generated resumes as PDF files in a secure and scalable cloud environment.
* **History and Preview:** Listing saved resumes with automatically generated preview URLs (secured via SAS tokens), so users can view their files without exposing sensitive data.
* **Deletion:** Allowing users to delete saved resumes securely through the API.

## **4.2. Relational Data Storage with Azure PostgreSQL**

### **User and Account Management**

The application uses Azure PostgreSQL as the relational database to store and manage essential user data. Key functionalities include:

* **User Authentication:**
   Registration and login endpoints securely store user credentials and personal information.
* **Account Operations:**
  Endpoints to create, update, and retrieve account details (including personal, educational, and professional information) are implemented using Prisma as an ORM for PostgreSQL.

### **Database Table Design:**

Our application uses Azure PostgreSQL as the relational database, managed through Prisma ORM. The schema contains two main tables:

* **User Table:** Stores basic login credentials and identity information:\
  **Purpose:** Handles user registration, login, and links to personal resume data.
  * **id:** Auto-increment primary key
  * **name:** User’s full name
  * **email:** Unique login email
  * **password:** Optional hashed password
  * **createdAt:** Timestamp of registration
  * **account:** Optional one-to-one linked profile in the Account table
* **Account Table:** Contains detailed resume and personal information:\
  **Purpose:** Serves as a comprehensive container for all resume-relevant data, stored in a flexible format to support dynamic resume generation.
  * **id:** Auto-increment primary key
  * **userId:** Foreign key linking to the User table
  * **name, surname:** User’s first and last name
  * **phonePrefix, phone:** Contact number with country code
  * **email:** Contact email
  * **github, linkedin:** Profile links
  * **city, state:** Location information
  * **education, experience, technicalSkills, projects:** Resume content stored as JSON
  * **createdAt, updatedAt:** Timestamps for creation and updates

# **5\. \[Bonus\] API Endpoints Documentation**

This document provides an overview of the API endpoints available in the web application. The API is built using Express.js and follows RESTful principles. Endpoints are organized into three main modules, Authentication (Auth), Account Management and Resume Management.

All endpoints that modify or retrieve user-specific data are protected using JWT-based authentication. Clients must include a valid JWT token in the `Authorization` header for protected routes (e.g., `Authorization: Bearer <token>`).

## **5.1. Authentication Endpoints**

These endpoints handle user registration and login.

### **POST /signup**

* **Description:** Registers a new user.
* **Request Body:**
  * `name` (string): User’s full name.
  * `email` (string): User’s email address.
  * `password` (string): User’s password.
* **Response:** Returns a success message along with the newly created user's ID.
  * `201 Created`: User registered successfully. Returns `userId`.
  * `400 Bad Request`: Invalid input or user already exists.

### **POST /login**

* **Description:** Authenticates a user and issues a JWT token.
* **Request Body:**
  * `email` (string): User’s email address.
  * `password` (string): User’s password.
* **Response:** Returns a success message and a JWT token valid for one hour.
  * `200 OK`: Login successful. Returns JWT token.
  * `401 Unauthorized`: Email or password is incorrect.

## **5.2. Account Management Endpoints**

These endpoints allow users to manage their account details. They require the user to be authenticated.

### **GET /account**

* **Description:** Retrieves the account details for the authenticated user.
* **Response:** Returns account information (e.g., personal information, education, experience, skills, projects).
  * `200 OK`: Successfully retrieved account.
  * `404 Not Found`: No account found for the user.
  * `500 Internal Server Error`: Server failed to retrieve account.

### **POST /account**

* **Description:** Creates a new account for the authenticated user.
* **Request Body:** Must include:
  * `personal_information`: Objects containing fields such as `name`, `surname`, `phone`, `email`, `github`, `linkedin`, `city`, and `state`.
  * `education_details`: Education history details.
  * `experience_details`: Work experience details.
  * `technical_skills`: Technical skills.
  * `projects`: Project information.
* **Response:** Returns a success message with the newly created account data.
  * `201 Created`: Account created successfully.
  * `400 Bad Request`: Invalid request data or database error.

### **PUT /account**

* **Description:** Updates the existing account details for the authenticated user.
* **Request Body:** Similar structure to the POST request.
* **Response:** Returns a success message with the updated account data.
  * `200 OK`: Account updated successfully.
  * `400 Bad Request`: Failed to update due to invalid data or database error.

## **5.3. Resume Management Endpoints**

These endpoints enable users to generate, save, view, and delete resumes. All actions require user authentication.

### **POST /resume/generate**

* Description: Generates a PDF resume based on provided resume data. The tailored resume is returned as a PDF file.
* Request Body: Contains resume data for tailoring the content.
* Response: Returns a PDF (with `Content-Type: application/pdf`) along with a custom header (`X-Resume-Title`) that indicates the title of the resume.
  * `200 OK`: Returns generated PDF and a custom `X-Resume-Title` header.
  * `400 Bad Request`: Missing required fields (e.g., resumeJson).
  * `500 Internal Server Error`: Failed to generate the PDF resume.

### **POST /resume/save**

* **Description:** Saves a generated resume to cloud storage.
* **Request Body:**
  * `buffer` (string): Base64-encoded PDF buffer.
  * `resumeTitle` (string): Title for the resume (used to generate a safe filename).
* **Response:** Returns a success message including the blob name and filename.
  * `200 OK`: Resume saved successfully. Returns blob name and filename.
  * `400 Bad Request`: Missing buffer or invalid data.
  * `500 Internal Server Error`: Failed to upload to Azure Blob Storage.

### **GET /resume/history**

* **Description:** Lists all resumes saved by the authenticated user. Each entry includes a preview URL generated via Azure Blob Storage.
* **Response:** Returns an array of resume objects with details like blob name, filename, preview URL, and last modified date.
  * `200 OK`: Returns an array of resumes with preview URLs and metadata.
  * `500 Internal Server Error`: Failed to fetch resume list.

### **DELETE /resume/history/:blobName(\*)**

* **Description:** Deletes a specific saved resume identified by its blob name. Ensures the authenticated user is authorized to delete the resume.
* **Response:** Returns a confirmation message upon successful deletion.
  * `200 OK`: Resume deleted successfully.
  * `403 Forbidden`: Attempt to delete someone else’s resume.
  * `500 Internal Server Error`: Failed to delete from cloud storage.

# **6. User Guide**

Welcome to ResuMatch, your AI-powered resume generator that helps you create tailored, professional resumes—fast. Whether you’re applying for your first job or switching careers, ResuMatch makes resume writing smarter and easier.

## **6.1. Homepage**

Start at the ResuMatch home page. From here, you’ll see two main actions on our top navigation bar:

- **login/signup**
  - If you already have an account, just enter your email and password to log in.
  - If you’re new, click **Sign Up Now** and create an account with your name, email, and a password.

- **craft my resume**
  - You’ll need to log in to access this feature.

## **6.2. After You Log In: Navigation Guide**

Once you're logged in, your navigation bar will show several options:

- **my Account**
  This is where you fill in your resume content. It’s organized into five simple sections:
  - Personal Details: Name, email, phone, LinkedIn, etc.
  - Education: School, degree, graduation dates, GPA
  - Work Experience: Job title, company, dates, responsibilities
  - Projects: Project name, description, technologies used
  - Skills: Programming languages, tools, frameworks

  You can return anytime to update or edit your details.

- **resume**
  This is where you’ll find your previously saved resumes. Here you can:
  - Preview your resume
  - Download it as a PDF
  - Delete older versions you no longer need

- **craft my resume**
  Here's how it works:
  1. Paste a job description into the text box
  2. Click **Generate Resume** (Note: You must have your account details filled out first)
  3. ResuMatch uses AI to find the most relevant experiences and skills from your profile
  4. Preview the resume
  5. Make edits if needed, then save or download

- **sign out**
  Click Sign Out anytime to safely log out of your account.

## **6.3. Frequently Asked Questions (FAQs)**

**Q: Are my details saved?**
Yes. All the information you enter under **Account** is saved to your profile for future use.

**Q: Can I create more than one version?**
Absolutely! Each time you generate a resume, it's saved. You can view, download, or delete previous versions in the Resume section.

## **6.4. Who is ResuMatch for?**

- Job seekers looking to customize resumes quickly and effectively
- Professionals applying across multiple roles or industries
- Individuals with multi-disciplinary backgrounds
- Students and recent graduates
- Career changers needing to highlight transferable skills
- Anyone wanting to save time with a high-quality, AI-powered resume

# **7\. Development Guide**

This guide outlines the steps needed to configure your local development environment, run the application, and understand the key configurations for database and cloud storage. Follow the instructions below to get started.

## **7.1. Environment Setup and Configuration**

### **Prerequisites**

* `Node.js`: Ensure you are using `Node.js v18.20.3` (the project has been tested with this version) to avoid compatibility issues.
* `.env` Files: The correct environment variables must be set. The values have been shared via WhatsApp. There should be a `.env` file present in the `ResuMatch/server` directory (and as needed for other parts).

### **`.env` Example (Local Development)**

Below is a concise example of the environment variables used in local development, along with brief instructions on how to obtain each one:
```bash
DATABASE_URL="postgresql://resumatch:ece1724web!@resumatch.postgres.database.azure.com:5432/postgres?sslmode=require"
OPENAI_API_KEY="sk-your-openai-api-key"
AZURE_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=https;AccountName=resumatch;AccountKey=your-storage-account-key;EndpointSuffix=core.windows.net"
AZURE_ACCOUNT_NAME="resumatch"
AZURE_ACCOUNT_KEY="your-storage-account-key"
PORT="8080"
PDFSHIFT_API_KEY="sk-your-pdfshift-api-key"
```


### **How to Obtain These Parameters**

* **`DATABASE_URL`:** Log into the [Azure Portal](https://portal.azure.com/), go to your PostgreSQL server resource, and copy the connection string from the Connection Strings section.
* **`OPENAI_API_KEY`:** Retrieve from your OpenAI account dashboard.
* **`AZURE_STORAGE_CONNECTION_STRING`:** In the Azure Portal, navigate to your Storage Account, find the Access keys section, and copy the connection string.
* **`AZURE_ACCOUNT_NAME & AZURE_ACCOUNT_KEY`:** Also located in your Storage Account’s Access keys section.
* **`PORT`:** Set to your desired local port (e.g., 8080).
* **`PDFSHIFT_API_KEY`:** Get from your PDFShift account dashboard.

## **7.2. Local Development Setup**

### **Clone the Repository**

Clone the ResuMatch repository and navigate to the project root:

```bash
git clone https://github.com/evve0119/ResuMatch.git
cd ResuMatch
```

### **Configure the Client**

Before running the client, update the base URL in `/client/src/api.jsx`:

1. Open the file `/client/src/api.jsx` in your preferred editor.
2. Change the baseURL value for local development:
```bash
import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://resumatch-backend-hud2d3crdue2d3ad.eastus2-01.azurewebsites.net',
  withCredentials: true,
  // For local development, you can switch this:
  baseURL: 'http://localhost:8080',
});

export default api;
```



### **Running the Client**

Open a terminal, navigate to the client directory, and run the following commands:

```bash
cd ResuMatch/client
npm install
npm run dev
```

This will install all dependencies and start the client development server.

### **Running the Server**

In a separate terminal, navigate to the server directory and run:

```bash
cd ResuMatch/server
npm install
npm start
```


This will install server dependencies and start the backend server on the port specified in your `.env` (default is 8080).

## **7.3. Database Initialization**

* **Database:** The application uses an Azure PostgreSQL database. You do not need to run a local instance. Ensure the `DATABASE_URL` in your `.env` file contains the correct Azure PostgreSQL connection string.
* **Prisma Studio:** To observe and interact with your database, run the following command to open a web-based interface for your database:
```bash
npx prisma studio
```
## **7.4. Cloud Storage Configuration**

Cloud storage is configured through the environment variables provided in your `.env` file. Key variables include:

* **`AZURE_STORAGE_CONNECTION_STRING`:** Used for connecting to Azure Blob Storage.
* **`AZURE_ACCOUNT_NAME & AZURE_ACCOUNT_KEY`:** Required for generating SAS tokens and managing fine-grained access.

## **7.5. Test Account for Demo Purposes**

For demo and testing, use the following credentials to log into the application:

* **Email:** chaolin10230568@gmail.com
* **Password:** 1234

# **8\. Deployment Information**

* **Live URL:** https://purple-moss-034ab441e.6.azurestaticapps.net/
* **Deployment Platform:** The backend is hosted on Azure App Services while the client uses static web hosting.
* **CI/CD Pipeline:** The project uses a GitHub Actions pipeline to automate deployments from the repository to the Azure environment.

# **9\. Individual Contributions**

### **Chao-Lin: Scrum Master, Backend & Integration**

Led sprint planning, designed backend architecture, implemented authentication, connected frontend APIs, and managed CI/CD pipeline.

### **Phyllis: UI/UX & Frontend**

Designed Figma mockups, built UI with React and Tailwind CSS, added form validation and final visual refinements.

### **Saud: DevOps & Prompt Engineering**

Set up Azure Blob Storage and PostgreSQL, built and fine-tuned prompt engineering logic for tailored resume generation

### **Wendong: Resume Processing & Backend**

Built html-resume logic, implemented PDF export, integrated Azure storage, tested APIs, and supported backend deployment.

# **10\. Lessons Learned and Final Thoughts**

This project taught us the importance of team collaboration and how critical it is to make thoughtful architectural decisions when building a full-stack application. Working together, we learned how to divide responsibilities efficiently and communicate effectively to ensure smooth progress.

One key technical lesson came from a mistake we made early on: we initially used Chromium to generate our PDF resumes. While it worked locally, deploying it to a cloud environment proved to be problematic due to its heavy resource requirements. After struggling for several days, we decided to switch to a lighter, third-party solution — PDFShift. This experience reminded us that adaptability is key in software development — when something doesn’t work, there’s often another tool or approach that can achieve the same result more efficiently.

Through this process, we also gained a much clearer understanding of what it takes to build a scalable and production-ready web application. From setting up cloud infrastructure to implementing prompt-based resume tailoring and managing blob storage, every step required us to think critically and collaborate closely.

Most importantly, we realized that building a product like this isn’t just about writing code — it’s about designing systems that work in real-world environments and learning how to balance flexibility, performance, and maintainability. This project gave us both technical growth and valuable experience in working as a true development team.

# **11\. Video Demonstration**

[![Watch the video](./image/Demo.png)](https://youtu.be/8fv66G7TbtQ)
