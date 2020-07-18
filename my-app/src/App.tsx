import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import {ingredient} from './ingredient';
import './App.css'
import { Grid, makeStyles, Theme, createStyles, Button, TextField } from "@material-ui/core";

interface IState {
  recipe: { 
    label: string, 
    image: string, 
    calories: number, 
    ingredients: ingredient[], 
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
    searchForm: {
      display: 'flex',
	    justifyContent: 'center',
      alignItems: 'center',
      padding: '0 50px'
    },
    b: {
      padding: '8px 30px',
      fontSize: '18px',
      backgroundColor: '#ff9a9e'
    },
  }),
);

export default function App() {
  const classes = useStyles();
  
  const [recipes, setRecipes] = useState<IState[]>([  ]);
  const [search, setSearch] = useState(''); 
  const [query, setQuery] = useState('chicken');
  const [HasFocus, setHasFocus] = useState<boolean>(false);

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=91d66eec&app_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const handleSubmit = () => {
    if (search?.length !== 0 && search !== null && search !== "") {
      setQuery(search);
		  setSearch('');
    } else {
        setHasFocus(true);
    }
}

  return (
    <div className="App">
       <Grid container className={classes.searchForm}>
            <Grid item xs={6}>
                <TextField
                    required
                    id="outlined-required"
                    label="Search by keyword (5 search per min)"
                    variant="filled"
                    fullWidth
                    size="small"
                    error={HasFocus && search === ""}
                    onClick={() => setHasFocus(true)}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.b} disableElevation>
                    Submit
                </Button>
            </Grid>
          </Grid>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
      {recipes.map(recipe => (
        <Grid item xs={4}>
          <div className={classes.paper}>
            <Recipe
              title={recipe['recipe'].label}
              calories={Math.round(recipe['recipe'].calories)}
              image={recipe['recipe'].image}
              ingredients={recipe['recipe'].ingredients}
            />
          </div>
        </Grid>
      ))}
      </Grid>
    </div>
  );
}
