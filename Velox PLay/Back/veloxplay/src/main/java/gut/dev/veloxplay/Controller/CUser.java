package gut.dev.veloxplay.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import gut.dev.veloxplay.Service.SUser;
import gut.dev.veloxplay.Model.User;
import gut.dev.veloxplay.Model.Filme;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class CUser {

    @Autowired
    private SUser serviceUser;

    // GET /users
    @GetMapping
    public List<User> getAllUsers() {
        return serviceUser.findAll();
    }

    // GET /users/{id}
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return serviceUser.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /users
    @PostMapping
    public User createUser(@RequestBody User user) {
        return serviceUser.save(user);
    }

    // PUT /users/{id}
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> existing = serviceUser.findById(id);
        if (existing.isPresent()) {
            updatedUser.setId(id);
            return ResponseEntity.ok(serviceUser.save(updatedUser));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /users/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        serviceUser.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    // POST /{userID}/favoritos/{filmesId}
    @PostMapping("/{userId}/favoritos/{filmeId}")
    public ResponseEntity<User> adicionarFavorito(
            @PathVariable Long userId,
            @PathVariable Long filmeId) {

        User userAtualizado = serviceUser.adicionarFavorito(userId, filmeId);
        return ResponseEntity.ok(userAtualizado);
    }
    // DELETE /{userID}/favoritos/{filmesId}
    @DeleteMapping("/{userId}/favoritos/{filmeId}")
    public ResponseEntity<User> removerFavorito(
            @PathVariable Long userId,
            @PathVariable Long filmeId) {

        User userAtualizado = serviceUser.removerFavorito(userId, filmeId);
        return ResponseEntity.ok(userAtualizado);
    }
    // GET /{userID}/favoritos/{filmesId}
    @GetMapping("/{userId}/favoritos")
    public ResponseEntity<List<Filme>> getFavoritos(@PathVariable Long userId) {
        List<Filme> favoritos = serviceUser.getFavoritos(userId);
        return ResponseEntity.ok(favoritos);
    }
}
