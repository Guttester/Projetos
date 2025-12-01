package gut.dev.veloxplay.Repository;

import gut.dev.veloxplay.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RUser extends JpaRepository <User,Long> { }