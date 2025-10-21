# TED Web Server

## Getting started

Install docker ([docs](https://docs.docker.com/engine/install/))

Clone this repo

Set up environment

```bash
cp .env.template .env
```

Change secrets in `.env`

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

Download data

```text
https://zenodo.org/records/10848710
```

Start docker compose

```bash
docker compose build
docker compose up -d
```

Load data

```bash
docker compose exec db psql -U postgres app -f data/load_domainsummary.sql
docker compose exec db psql -U postgres app -f data/load_interactionsummary.sql
docker compose exec db psql -U postgres app -f data/load_chainparse.sql
docker compose exec db psql -U postgres app -c 'select tuples_processed from pg_stat_progress_copy'
```

## Citations

If you use TED, please cite the main paper:

- Lau, A. M., Bordin, N., Kandathil, S. M., Sillitoe, I., Waman, V. P., Wells, J., Orengo, C., and Jones, D. T. Exploring structural diversity across the protein universe with The Encyclopedia of Domains. Science 386, eadq4946 (2024). [doi:10.1126/science.adq4946](https://doi.org/10.1126/science.adq4946)

If you use results derived from the individual domain parsing methods integrated into TED, please cite the corresponding works:

- Chainsaw: Wells, J. et al. Chainsaw: protein domain segmentation with fully convolutional neural networks. Bioinformatics (2024). [doi:10.1093/bioinformatics/btae296](https://doi.org/10.1093/bioinformatics/btae296)
- Merizo: Lau, A. M., Kandathil, S. M. & Jones, D. T. Merizo: a rapid and accurate protein domain segmentation method using invariant point attention. Nature Communications (2023). [doi:10.1038/s41467-023-43934-4](https://doi.org/10.1038/s41467-023-43934-4)
- UniDoc: Zhu, K. et al. A unified approach to protein domain parsing with inter-residue distance matrix. Bioinformatics (2023). [doi:10.1093/bioinformatics/btad070](https://doi.org/10.1093/bioinformatics/btad070)
