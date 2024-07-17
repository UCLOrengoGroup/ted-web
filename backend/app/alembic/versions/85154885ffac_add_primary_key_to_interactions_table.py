"""Add primary key to interactions table

Revision ID: 85154885ffac
Revises: 1c1f4690b870
Create Date: 2024-07-10 12:51:40.973887

"""

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = "85154885ffac"
down_revision = "1c1f4690b870"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    # Drop primary key constraint. Note the CASCASE clause - this deletes the foreign key constraint.
    op.drop_constraint("interactionsummary_pkey", "interactionsummary")
    op.add_column(
        "interactionsummary",
        sa.Column("id", sa.Integer(), nullable=False, primary_key=True),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("interactionsummary", "id")
    sa.PrimaryKeyConstraint("af_id", name=op.f("interactionsummary_pkey")),
    # ### end Alembic commands ###
