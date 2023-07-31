@Component
public class DataCleanup implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final UserRepository userRepository;

    @Autowired
    public DataCleanup(AdminRepository adminRepository, UserRepository userRepository) {
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Find and delete the default admin entry from the admin table
        AdminModel defaultAdmin = adminRepository.findByEmail("admin@gmail.com");
        if (defaultAdmin != null) {
            adminRepository.delete(defaultAdmin);
        }

        // Find and delete the default user entry from the user table
        UserModel defaultUser = userRepository.findByEmail("admin@gmail.com");
        if (defaultUser != null) {
            userRepository.delete(defaultUser);
        }
    }
}
