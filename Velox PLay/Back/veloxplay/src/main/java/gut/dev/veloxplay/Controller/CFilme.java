package gut.dev.veloxplay.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import gut.dev.veloxplay.Service.SFilme;
import gut.dev.veloxplay.Model.Filme;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/filmes")
public class CFilme {

    @Autowired
    private SFilme serviceFilme;

    // GET /filmes
    @GetMapping
    public List<Filme> getAllFilmes() {
        return serviceFilme.findAll();
    }

    // GET /filmes/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Filme> getFilmeById(@PathVariable Long id) {
        return serviceFilme.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /filmes
    @PostMapping
    public Filme createFilme(@RequestBody Filme filme) {
        return serviceFilme.save(filme);
    }

    // PUT /filmes/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Filme> updateFilme(@PathVariable Long id, @RequestBody Filme updatedFilme) {
        Optional<Filme> existing = serviceFilme.findById(id);
        if (existing.isPresent()) {
            updatedFilme.setId(id);
            return ResponseEntity.ok(serviceFilme.save(updatedFilme));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /filmes/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFilme(@PathVariable Long id) {
        serviceFilme.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
