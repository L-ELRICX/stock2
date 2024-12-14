import Link from 'next/link'
import { Linkedin, Mail, Phone, Github } from 'lucide-react'

const teamMembers = [
  {
    name: "Saket Srivastav",
    role: "Data Collection for Machine Learning Model",
    linkedin: "https://www.linkedin.com/in/saket-srivastava-a81631260/",
    email: "saketshrivastav@gmail.com",
    phone: "9473555123",
    github: "https://github.com/saket-srivastav"
  },
  {
    name: "Shivam Kaushik",
    role: "Model Development, Deployment, and Frontend",
    linkedin: "https://www.linkedin.com/in/shivam-kaushik-b6536a25",
    email: "shivamkaushik55x0@gmail.com",
    phone: "9407882456",
    github: "https://github.com/shivam-kaushik"
  },
  {
    name: "Tarachand Gupta",
    role: "Connectivity and Model Deployment",
    linkedin: "https://www.linkedin.com/in/tarachand-gupta-2374b229b/",
    email: "tarachadgupta@gmail.com",
    phone: "9329306543",
    github: "https://github.com/Tarachand01"
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
        <p className="text-xl mb-12 text-center">
          Meet the talented team behind StockSage, working together to revolutionize stock market predictions.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
              <p className="text-gray-400 mb-4">{member.role}</p>
              <div className="space-y-2">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400 hover:text-blue-300">
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </a>
                <a href={`mailto:${member.email}`} className="flex items-center text-green-400 hover:text-green-300">
                  <Mail className="w-5 h-5 mr-2" />
                  {member.email}
                </a>
                <p className="flex items-center text-yellow-400">
                  <Phone className="w-5 h-5 mr-2" />
                  {member.phone}
                </p>
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-purple-400 hover:text-purple-300">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

