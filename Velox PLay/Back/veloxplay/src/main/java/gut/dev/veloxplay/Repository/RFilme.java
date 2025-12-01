package gut.dev.veloxplay.Repository;

import gut.dev.veloxplay.Model.Filme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RFilme extends JpaRepository <Filme,Long> { }