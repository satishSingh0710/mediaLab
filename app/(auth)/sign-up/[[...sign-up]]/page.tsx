import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-extrabold text-gray-200 mb-6 text-center">
          Create Your MediaLabs Account
        </h2>
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition",
              formFieldInput:
                "input input-bordered input-primary w-full bg-gray-700 text-white",
              footerActionLink:
                "text-blue-400 hover:text-blue-500 transition",
            },
            layout: {
              socialButtonsPlacement: "bottom",
              logoPlacement: "outside",
            },
            
          }}
        />
      </div>
    </div>
  );
}
