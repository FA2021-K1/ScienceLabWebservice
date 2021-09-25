import { Link } from 'react-router-dom';

export const Breadcrumbs = ({crumbs}) => {
  crumbs = crumbs.crumbs;
  if (crumbs.length <= 0) {
    return null;
  }

  return (<div className="breadcrumbs-container">
    {crumbs.map(({ name, path }, key) =>
      key + 1 === crumbs.length ? (
        <span key={key}>{name}</span>
      ) : (
        <Link key={key} to={path}>{name}</Link>
      )
    )}
  </div>);
};