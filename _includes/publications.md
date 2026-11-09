<div class="publications">
<ol class="bibliography">

{% assign papers = site.data.publications.main %}
{% if include.selected %}{% assign papers = papers | where: 'selected', true %}{% endif %}
{% for link in papers %}

<li{% if link.id %} id="paper-{{ link.id | escape }}"{% endif %}>
<div class="pub-row">
  {% if link.image %}
  <div class="col-sm-3 abbr" >
    {% if include.selected and link.page %}<a href="{% include url.html url=link.page %}">{% endif %}
    <img src="{% include url.html url=link.image %}" alt="{{ link.image_alt | default: link.title | escape }}" loading="lazy" class="teaser img-fluid z-depth-1">
    {% if include.selected and link.page %}</a>{% endif %}
    {% if link.conference_short %}
    <abbr class="badge venue-badge" title="{{ link.conference | escape }}">{% if link.conference_badge %}{{ link.conference_badge | escape }}{% else %}{{ link.conference_short | escape }}{% if link.conference_year %} {{ link.conference_year }}{% endif %}{% endif %}</abbr>
    {% endif %}
  </div>
  {% endif %}
  <div class="col-sm-9" >
      {% assign title_url = link.pdf %}{% if link.paper_page %}{% assign title_url = link.paper_page %}{% elsif include.selected and link.page %}{% assign title_url = link.page %}{% endif %}
      <div class="title">{% if title_url %}<a href="{% include url.html url=title_url %}">{{ link.title }}</a>{% else %}{{ link.title }}{% endif %}</div>
      {% if link.authors %}<div class="author">{{ link.authors }}</div>{% endif %}
      <div class="periodical"><em>{{ link.conference }}</em>
      </div>
      {% if link.first_public_date %}<div class="entry-meta">First public: <time datetime="{{ link.first_public_date | date: '%Y-%m-%d' }}">{{ link.first_public_date | date: '%B %-d, %Y' }}</time></div>{% endif %}
      {% if link.contribution %}<p>{{ link.contribution }}</p>{% endif %}
    <div class="links">
      {% if link.pdf %} 
      <a href="{% include url.html url=link.pdf %}" class="btn btn-sm z-depth-0" role="button" target="_blank" rel="noopener" style="font-size:12px;">{{ link.pdf_label | default: 'Paper' }}</a>
      {% endif %}
      {% if link.paper_page %}<a href="{% include url.html url=link.paper_page %}" class="btn btn-sm">Paper page</a>{% endif %}
      {% if link.openreview %}<a href="{{ link.openreview | escape }}" class="btn btn-sm">OpenReview</a>{% endif %}
      {% if link.code %} 
      <a href="{% include url.html url=link.code %}" class="btn btn-sm z-depth-0" role="button" target="_blank" rel="noopener" style="font-size:12px;">Code</a>
      {% endif %}
      {% if link.page and link.page != link.paper_page %} 
      <a href="{% include url.html url=link.page %}" class="btn btn-sm z-depth-0" role="button" target="_blank" rel="noopener" style="font-size:12px;">Project</a>
      {% endif %}
      {% if link.bibtex %} 
      <a href="{% include url.html url=link.bibtex %}" class="btn btn-sm z-depth-0" role="button" target="_blank" rel="noopener" style="font-size:12px;">BibTex</a>
      {% endif %}
      {% include publication-links.html paper=link %}
      {% if link.notes %} 
      <strong> <i style="color:#e74d3c">{{ link.notes }}</i></strong>
      {% endif %}
      {% if link.others %} 
      {{ link.others }}
      {% endif %}
    </div>
  </div>
</div>
</li>

{% endfor %}

</ol>
</div>
