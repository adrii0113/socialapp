// react-wizardy dependencia
import { Wizard } from "react-wizardry";
import "react-wizardry/dist/react-wizardry.css";
export default function NewUserForm(){
    return(
        <Wizard
        theme={{
          primary: "#007fff",
          background: "#000",
          textColor: "#fff",
          formFieldBackground: "#282828",
          formFieldBorder: "#000",
          success: "#519259",
          fail: "#cf352e",
          inputBackground: "#464646",
          inputTextColor: "#fff",
          tabLineColor: "#464646",
          tabColor: "#7d7d7d"
        }}
        pages={[
          {
            title: "Introduction",
            fields: [
              {
                label: "First Name",
                name: "firstName",
                type: "text",
                isRequired: true
              },
              {
                label: "Last Name",
                name: "lastName",
                type: "text"
              },
              {
                name: "dateOfBirth",
                type: "datetime",
                label: "Date of Birth"
              },
              {
                label: "Email",
                name: "email",
                type: "email"
              },
              {
                name: "Phone number",
                label: "Phone",
                type: "phone"
              }
            ]
          },
          {
            title: "Employment",
            fields: [
              {
                label: "Company Name",
                name: "companyName",
                type: "text"
              },
              {
                label: "Designation",
                name: "designation",
                type: "text"
              }
            ]
          },
          {
            title: "CV & Social Links",
            fields: [
              {
                name: "CV",
                label: "Upload your CV",
                type: "file"
              },
              {
                label: "Portfolio URL",
                name: "Portfolio",
                type: "url",
                isRequired: true
              },
              {
                label: "Linkedin URL",
                name: "linkedin",
                type: "url"
              },
              {
                label: "Github URL",
                name: "Github",
                type: "url"
              },
              {
                name: "twitter",
                label: "Twitter URL",
                type: "url"
              }
            ]
          },
          {
            title: "salary",
            fields: [
              {
                label: "Select your current salary range",
                name: "salaryRange",
                type: "select",

                selectOptions: [
                  { name: "10,000$ - 50,000$", value: "10-50k" },
                  { name: "50,000$ - 100,000$", value: "50-100k" }
                ]
              },
              {
                label: "Expected Salary",
                name: "expectedSalary",
                type: "text"
              }
            ]
          }
        ]}
      />
    )
}
