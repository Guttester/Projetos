package gut.dev.veloxplay.Service;


import java.util.List;
import java.util.Optional;

import gut.dev.veloxplay.Model.Filme;
import gut.dev.veloxplay.Repository.RFilme;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SFilme {
    @Autowired
    private RFilme repositoryUser;
    
    public List<Filme> findAll(){ return repositoryUser.findAll(); }
    public Optional<Filme> findById(Long id){ return repositoryUser.findById(id); }
    public Filme save(Filme obj){ return repositoryUser.save(obj); }
    public void deleteById(Long id){ repositoryUser.deleteById(id); }
}