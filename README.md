# **Project Proposal: ResuMatch**

_Development Team: Saud Badar, Chao-Lin Chen, Wendong Li, Phyllis Wu_

## **How to Run**

To set up and run the ResuMatch application locally, please follow the steps below:

1. **Clone the repository** and navigate to the project root.

2. **Install and run the client:**
   ```bash
   cd ResuMatch/client
   npm install
   npm run dev


3. **In a separate terminal, install and run the server:**
   ```bash
   cd ResuMatch/server
   npm install
   npm run dev
4. **Environment Configuration:**
Ensure that a `.env` file is present in both `ResuMatch/server` and directory. The correct environment variables have been shared via WhatsApp.
5.	**Node.js Version:**
    The project is tested with Node.js v18.20.3. Make sure you are using this version to avoid compatibility issues.
6.	**Test Account for Demo Purposes:**
    You may use the following credentials to log in and test the application:

      •	Email: chaolin10230568@gmail.com

      •	Password: 1234


# **1\. Motivation**

## **1.1. Problem Statement**

Creating a tailored resume for different job applications is a time-consuming and tedious process. Job seekers often spend significant time modifying their resumes for specific roles and may struggle with selecting the most relevant experiences and skills to highlight. Many existing resume builders lack intelligent selection features, requiring users to manually input and format their resumes each time they apply for a job. Additionally, generic resume templates do not offer enough flexibility for candidates to effectively emphasize their most relevant skills and achievements for different job applications.

## **1.2. Why This Project?**

As young professionals, job-seeking is an essential and often demanding part of our careers. Preparing job applications requires a significant amount of time, especially when balancing interview preparation, such as coding challenges, networking, and skill-building. However, a high-quality resume is the critical first step in securing an interview opportunity.

This project aims to automate the resume customization process by leveraging AI to intelligently select the most relevant experiences based on a given job description. By streamlining resume creation, job seekers can not only save valuable time but also improve the quality and relevance of their resumes. This will increase their chances of passing applicant tracking systems (ATS) and impressing recruiters. Our automation approach will enable users to generate highly targeted resumes with minimal effort, enhancing their overall job application efficiency.

## **1.3. Target Users**

- Job seekers looking to customize resumes quickly and effectively
- Professionals applying for multiple roles in different industries
- Individuals with multi-disciplinary backgrounds applying for various roles
- Students and recent graduates who need assistance in structuring their resumes
- Career changers who need to highlight transferable skills for different industries

## **1.4. Existing Solutions & Limitations**

- **Traditional Document Editing Software** (e.g., Microsoft Word): Allow complete customization but require users to manually format, structure, and optimize their resumes.
- **Traditional Resume Builders** (e.g., [Canva](http://Canva)): Provide static templates but lack intelligent experience selection, requiring extensive manual adjustments.
- **AI Document Editing Tools** (e.g., [ABScribe](https://abtestingtools-frontend.up.railway.app/)): Offer document structuring and editing assistance but are not specifically designed for resume customization.
- **Modern Resume Builders** (e.g., [ResumeBuilder](https://www.resumebuilder.com/)): Offer more customization but still rely on users manually selecting relevant experiences.
- **ATS Optimization Tools** (e.g., Jobscan, Resumeworded): Help users optimize resumes for ATS but do not dynamically generate tailored resumes or offer flexible design options.

# **2\. Objective and Key Features**

## **2.1. Project Objectives**

**_ResuMatch_** aims to bridge the gap between existing document editing tools and resume builders by combining advanced AI with user-centred customization. Leveraging **machine learning**, **natural language processing**, and **structured metadata**, this full-stack web application enables users to generate tailored resumes efficiently based on job descriptions. Ultimately, **_ResuMatch_** helps job seekers highlight their most relevant experiences and skills, improving their chances of securing interviews while streamlining the resume-building process.

To achieve this, **_ResuMatch_** will enable users to store and manage their professional information (such as experiences, education, and skills) within a structured database. When users input a job description or paste a job posting URL, the system will intelligently match the most relevant professional information using AI-based keyword and role relevance analysis. Users will then have the flexibility to manually refine the auto-generated resume, adjusting its content, layout, and formatting to fit their needs. Finally, resumes can be exported in multiple formats, including PDF, Text, and Markdown. The following sections will outline the technical details of the core features and implementation.

## **2.2. Core Features & Technical Implementation**

### **Architecture**

A flowchart illustrating the architecture of **_ResuMatch_**.

![arch](https://raw.githubusercontent.com/levscaut/levscaut.github.io/main/ResumeAI.drawio.png)

### **Technical Implementation Approach**

**_ResuMatch_** follows a **separated frontend and backend architecture**. The frontend is built using **React** with **TailwindCSS,** and the backend is implemented with **Express.js**, structured as a **RESTful API**, managing user authentication, resume generation, and external service integrations.

The backend ensures secure communication with **JWT-based authentication using Passport.js**, handling role-based access control. Data is stored in **Azure SQL Database**, with structured relationships between users, experiences, education, and resumes. Resume files are securely stored in **Azure Blob Storage**, enabling efficient file retrieval and management. The AI-powered resume customization functionality relies on **OpenAI API**, allowing users to generate optimized resumes based on job descriptions.

The backend is structured with clear API endpoints:

- **Authentication & Security**: JWT-based authentication for secure user sessions.
- **Resume Generation API**: Accepts job descriptions, processes data using AI, and generates a customized resume.
- **User Data Management**: CRUD operations for users, experiences, education, and skills.
- **File Handling API**: Uploads, retrieves, and manages resumes stored in Azure Blob Storage.

### **Integration with External Services**

**_ResuMatch_** integrates with several external services to enhance functionality and efficiency. **Azure Blob Storage** is used for storing resumes, ensuring secure and scalable file handling. **Azure SQL Database** manages structured data, providing relational integrity and performance optimization. The **OpenAI API** is leveraged to process job descriptions, extract relevant skills and experiences, and optimize resume content keyword matching and role relevance analysis. For authentication, the project supports **Passport.js with JWT** for session management, ensuring secure login and authorization.

### **Database Schema and Relationships**

The **PostgreSQL database (hosted on Azure SQL Database)** is structured to efficiently manage user data, job experiences, and resume content. The key tables include:

- **Users Table** (**_id_**, _name_, _email_, _password_, _created_at_, _updated_at_): Stores user credentials and profile settings.
- **Experiences Table** (**_id_**, _user_id_, _company_, _role_, _description_, _skills_, _date_range_): Manages work experience records linked to users.
- **Education Table** (**id**, _user_id_, _institution_, _degree_, _graduation_date_): Stores academic background.
- **Skills Table** (**_id_**, _user_id_, _skill_name_, _proficiency_): Maintains a list of user skills and their proficiency levels.
- **Resumes Table** (**_id_**, _user_id_, _title_, _media_link_, _created_at_): Tracks generated resumes and their storage locations.

The schema ensures data integrity by linking user-related tables through **foreign keys**, allowing structured and efficient queries.

### **File Storage Requirements**

All resume files are securely stored in **Azure Blob Storage**. The system allows users to generate resumes in **multiple formats**, including **PDF, Markdown, and plain text**, ensuring flexibility in job applications. **File upload, retrieval, and deletion functionalities** are handled via API endpoints, ensuring secure and efficient file management.

### **User Interface and Experience Design**

The frontend is designed in **Figma** and developed using **React.js** with **TailwindCSS**, ensuring a modular, interactive, responsive, and scalable user interface. The layout is structured into reusable components, making it modular and scalable. The project uses **shadcn/ui** for pre-styled UI components, ensuring consistency and ease of development. The **React Router** manages navigation and a **drag-and-drop customization feature** allows users to rearrange resume sections dynamically, enhancing usability and personalization.

## **2.3. Core Technical Requirements**

Our implementation ensures that **_ResuMatch_** meets all core technical requirements by integrating essential technologies, following the specified architecture, and leveraging Azure services for cloud storage, database hosting, and deployment. This approach maintains a scalable, secure, and user-friendly experience. The tools and technologies used in this project are summarized below:

- **Frontend:** React, Tailwind CSS, shadcn/ui and Figma
- **Architecture Approach and Backend:** React, Express.js and RESTful API
- **Data Storage and Cloud Infrastructure:** PostgreSQL, Azure RDS and Azure Blob Storage
- **Advanced Feature Implementation:** JWT-based authentication, Passport.js and OpenAI API

## **2.4. Project Scope and Feasibility**

**_ResuMatch_** is a scalable, modular full-stack web application designed to intelligently generate tailored resumes based on job descriptions. Within the one-month timeframe, the project prioritizes core functionalities while maintaining a structured development process, focusing solely on resume generation and customization rather than broader career management features.

To ensure feasibility while delivering an AI-enhanced, customizable, and user-friendly resume-building experience, **_ResuMatch_** leverages pre-built libraries, cloud services, and a structured workflow. To introduce AI-driven innovation without excessive complexity, it integrates the OpenAI API instead of developing a custom AI model.

Development follows a structured timeline with weekly milestones, ensuring steady progress while allowing time for debugging and optimizations. Additionally, team roles are clearly defined to facilitate an efficient workflow. A tentative plan for project development is outlined in the following section.

# **3\. Tentative Plan**

The **_ResuMatch_** development team consists of four members: **Saud**, **Chao-Lin**, **Wendong**, and **Phyllis**. To ensure an efficient workflow, this section includes a detailed development plan.

## **3.1. Team Roles Overview:**

- **Chao-Lin:** Scrum Master, System Architecture & Integration
- **Phyllis:** UI/UX, Frontend Development
- **Saud:** Prompt Engineering, DevOps, Cloud Infrastructure
- **Wendong:** Metadata-Resume Processing, Backend & Storage Management

## **3.2. Project Timeline and Task Distribution**

### **Week 1 (Mar 17): Initial Setup and Core Implementation**

**Chao-Lin (Backend, Resume Transformer)**

- Set up the React project with essential components.
- Implement user authentication (JWT/Passport).
- Expose API endpoints for frontend access.
- Containerize the backend using Docker.

**Phyllis (Frontend \- UI/UX)**

- Design Figma mockups for key pages:
  - Login
  - Signup
  - Main Dashboard
  - User Profile
  - History Page
  - Resume Creation Page (for Job Description input/link)

**Saud (Azure & DevOps, Prompt Engineering)**

- Set up Azure cloud infrastructure:
  - Azure Blob Storage
  - Azure Database (Azure SQL Database)
- Configure mock data for metadata testing in the Azure database.
- Initial setup for prompt engineering logic (metadata fine-tuning).

**Wendong (Frontend/Backend, Authentication & CRUD)**

- Develop resume builder logic to transform structured metadata into HTML resumes.
- Expose API endpoints for frontend access.
- Establish the basic structure of the project, including models, routes, controllers, and middleware.

### **Week 2 (Mar 24): Feature Development and API Integration**

**Chao-Lin (Resume Transformer & Backend)**

- Integrate the frontend with backend APIs using Axios.
- Manage CORS policies and validate CRUD operations.
- Implement CRUD APIs for metadata, user profiles, and resumes.

**Phyllis (Frontend \- React & Tailwind CSS)**

- Develop the frontend UI using React and Tailwind CSS based on Figma designs.
- Ensure responsiveness and UI consistency.

**Saud (Prompt Engineering & Azure DevOps)**

- Fine-tune prompts for custom metadata processing.
- Develop a pipeline for the new resume generator.
- Implement a Job Description (JD) link web scraper.

**Wendong (Backend Integration)**

- Implement HTML-to-PDF and DOCX conversion logic.
- Store generated resumes in Azure Blob Storage.

### **Week 3 (Mar 31): Enhancements and Debugging**

**Chao-Lin (Optimization & Debugging)**

- Strengthen API security with input validation.
- Prepare for deployment by ensuring proper configuration and scalability.

**Phyllis (Frontend Enhancements)**

- Improve UI based on initial testing and feedback.
- Implement frontend data validation and error handling.

**Saud (Azure DevOps Optimization & Monitoring)**

- Implement appropriate status codes and detailed error messages for API endpoints.
- Enhance logging mechanisms to improve error tracking and debugging.

**Wendong (API Stability & Security)**

- Optimize metadata-to-resume conversion.
- Debug PDF and DOCX generation.
- Ensure frontend and backend alignment for a smooth user experience.

### **Week 4 (Apr 7): Testing & Pre-Deployment**

**Chao-Lin**

- Perform backend unit tests and debug resume conversion processes.
- Address any API-related issues affecting resume generation.

**Phyllis**

- Conduct frontend unit tests and validate UI consistency.
- Test form validation and error handling.

**Saud**

- Test Azure infrastructure stability.
- Ensure prompt engineering and JD web scraping function correctly.

**Wendong**

- Perform API testing, including authentication and CRUD operations.
- Identify and fix potential performance bottlenecks.

**All Team Members**

- Conduct full integration testing across frontend, backend, and storage.
- Document issues, prioritize bug fixes, and prepare for deployment.

### **Week 5 (Apr 14): Final Wrap-Up & Production Deployment**

**Chao-Lin**

- Finalize backend optimizations and resolve outstanding issues.
- Assist with deployment pipeline setup on Azure.

**Phyllis**

- Apply final UI/UX refinements based on test results.
- Ensure frontend is fully responsive and polished.

**Saud**

- Implement final DevOps optimizations for deployment.
- Ensure Azure Monitor is tracking system health effectively.

**Wendong**

- Perform final API security and performance checks.
- Assist in backend deployment and database migrations.

**All Team Members**
Finalize documentation (README.md, deployment guide, API docs).

- Complete production deployment to Azure.
- Record a video demo showcasing the full functionality of the application.

# **4\. Conclusion**

**_ResuMatch_** presents an innovative solution to job seekers by automating resume customization, reducing manual effort, and improving application relevance. By leveraging AI, modern web development frameworks, and a user-friendly interface, our resume builder stands out as a **time-saving**, **AI-driven**, and **customizable** tool for professional growth. The inclusion of intelligent job description matching, resume versioning, and advanced customization ensures that users can create targeted resumes with ease, improving their chances of securing their desired roles.
