import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <main>
      <h2>Bienvenue au Zoo</h2>
      <section class="welcome">
        <div class="text-presentation">
          <p>
            Toute l'équipe d'Arcadia vous souhaite la bienvenue dans l'univers
            merveilleux des animaux. Notre parc a vu le jour en 1960, idéalement
            situé aux abords de la fôret de Brocéliande.
          </p>
          <p>
            Vous trouverez ici toutes les informations nécessaires afin
            d'organiser au mieux votre visite. N'hésitez pas à vous y balader et
            à y découvrir à travers les différentes pages, les divers habitats,
            tel que la savane, la jungle et les marais. Chaque univers propose
            une multitude d'animaux (de l'imposant lion à la plus petite
            grenouille).
          </p>
          <p>
            Pour passer un agréable séjour au sein de notre zoo, faites appel à
            nos services avec la découverte du lieu à bord du petit train,
            l'observation des animaux avec notre guide Manu ou bien encore
            faites une pause gourmande dans nos restaurants et snacks.
          </p>
          <p>
            Nous travaillons dans le respect de la vie animale mais également
            dans le respect de la vie environnementale. De manière à suivre nos
            valeurs écologiques nous avons élaboré et acquis au fil des années
            notre autonomie énergétique. Nous sommes fiers de pouvoir vous en
            faire profiter.
          </p>
          <p>
            Alors laissez vous immerger dans notre parc et plongez dans
            l'aventure!
          </p>
          <p>Au plaisir de vous y retrouver.</p>
          <p id="signature">José Dupont (directeur d'Arcadia depuis 1998)</p>
        </div>
        <div class="accordion">
          <div class="accordion-content">
            <img
              class="accordion-img"
              src="/assets/images/tigre.jpg"
              alt="tigre"
            />
          </div>
          <div class="accordion-content">
            <img
              class="accordion-img"
              src="/assets/images/panneauxsolaires.jpg"
              alt="hangar avec panneaux solaires sur le toit"
            />
          </div>
          <div class="accordion-content">
            <img
              class="accordion-img"
              src="/assets/images/elephants-279505_1280.jpg"
              alt="troupeau d'elephants"
            />
          </div>
        </div>
      </section>
      <section class="discovery-section">
        <h3>
          Poursuivez votre visite en découvrant nos habitats et nos services :
        </h3>
        <div class="container">
          <a class="stork" href="/habitats"
            ><h3>Les Habitats et les Animaux</h3></a
          >
          <a class="visit" href="/services"><h3>Les Services</h3></a>
        </div>
        <div>
          <img class="bird-img" [src]="'assets/images/klipartz.com (1).png'" alt="oiseau tropical" />
        </div>
      </section>
      <section class="reviews-section">
        <div class="reviews">
          <h3>Découvrez ce que nos visiteurs ont pensé de leurs séjours :</h3>
          <div class="review">
            <p class="review-content">
              Nous avons passé un agréable moment à Arcadia, un zoo familial et
              les animaux sont en excellente forme. Je recommande vivement.
            </p>
            <p class="review-name">Manon</p>
            <p class="review-date">12/03/2024</p>
            <button class="more-review-btn">+ d'avis</button>
          </div>
          <h3>
            Laissez nous votre avis en <a href="#new-review">cliquant ici</a>
          </h3>
          <div class="new-review" id="new-review">
            <form class="form-review">
              <div>
                <label for="name">Pseudo :</label>
                <input type="text" name="name" id="name" />
              </div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Ecrivez votre avis ici..."
              ></textarea>
              <button class="form-review-btn">Envoyer</button>
            </form>
          </div>
        </div>
      </section>
    </main>
    <!-- mettre composant -->
    <aside>
      <div>
        <img
          class="leaf"
          src="/assets/images/feuilles volantes.png"
          alt="feuilles volantes au vent"
        />
      </div>
    </aside>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
