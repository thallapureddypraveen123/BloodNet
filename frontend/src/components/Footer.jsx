const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-10 border-t">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-red-600 font-semibold">BloodNet</span> — Built with ❤️ by Praveen Thallapureddy
      </p>
    </footer>
  );
};

export default Footer;
