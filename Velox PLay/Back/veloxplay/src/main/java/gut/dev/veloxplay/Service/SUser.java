package gut.dev.veloxplay.Service;

import java.util.List;
import java.util.Optional;

import gut.dev.veloxplay.Model.User;
import gut.dev.veloxplay.Model.Filme;
import gut.dev.veloxplay.Repository.RUser;
import gut.dev.veloxplay.Repository.RFilme;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SUser {
    @Autowired
    private RUser repositoryUser;
    @Autowired
    private RFilme repositoryFilme;
    
    public List<User> findAll(){ return repositoryUser.findAll(); }
    public Optional<User> findById(Long id){ return repositoryUser.findById(id); }
    public User save(User obj){ return repositoryUser.save(obj); }
    public void deleteById(Long id){ repositoryUser.deleteById(id); }
    
    public User adicionarFavorito(Long userId, Long filmeId) {
        User user = repositoryUser.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Filme filme = repositoryFilme.findById(filmeId)
                .orElseThrow(() -> new RuntimeException("Filme não encontrado"));

        user.adicionarFavorito(filme);
        return repositoryUser.save(user);
    }
    public User removerFavorito(Long userId, Long filmeId) {
        User user = repositoryUser.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Filme filme = repositoryFilme.findById(filmeId)
                .orElseThrow(() -> new RuntimeException("Filme não encontrado"));

        user.removerFavorito(filme);
        return repositoryUser.save(user);
    }
    public List<Filme> getFavoritos(Long userId) {
        User user = repositoryUser.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return user.getFavoritos();
    }
}