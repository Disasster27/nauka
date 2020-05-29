import './style/style.css';
import './style/style.scss'
import './babel.js';
import pyotr from './images/pyotr-1.jpg';
import ava from './images/ava.png';



document.addEventListener('DOMContentLoaded', () => {


    

    class PersonGrid {
        constructor() {
            this.selectedElement = null;
            this.counter = 0;
            this.addEvent();
            this.allPerson = {};
        };
        addEvent () {
            document.querySelector('.control__save').addEventListener('click', () => {
                document.querySelector('.blackout').classList.add('invisible');
                this.addRow ();
            });
            document.querySelectorAll('tr').forEach(item => {
                item.addEventListener('click', e => {
                    event.target.parentElement.classList.toggle('select');
                })
            });
            document.querySelector('.control__cancel').addEventListener('click', () => {
                document.querySelector('.blackout').classList.add('invisible');
            });
            document.querySelector('.interaction__add').addEventListener('click', () => {
                document.querySelector('.blackout').classList.remove('invisible');
            });
            document.querySelector('.interaction__delete').addEventListener('click', () => {
                this.removePerson();
            });
            document.querySelector('.interaction__edit').addEventListener('click', () => {
                this.editPerson();
            });
        };
        addRow () {
                const personInfo = {
                    img: ava,
                    name: document.querySelector('input[name="name"]').value.trim(),
                    family: document.querySelector('input[name="family"]').value.trim(),
                    date: document.querySelector('input[name="date"]').value,
                    position: document.querySelector('select[name="position"]').value,
                    remote: document.querySelector('input[name="remote"]').checked,
                    address: {
                        city: document.querySelector('input[name="city"]').value.trim(), 
                        street: document.querySelector('input[name="street"]').value.trim(), 
                        house: document.querySelector('input[name="house"]').value.trim(), 
                        apart: document.querySelector('input[name="apart"]').value.trim(),
                    },
                    mark: document.querySelector('input[name="mark"]').checked,
                }; 
        
                let person = new Person(personInfo, grid);
                this.counter++;
                this.allPerson[per.id] = person;
        };
        removePerson () {
            this.selectedElement.remove();
        };
        editPerson () {
            const blackout = document.querySelector('.blackout');
            blackout.classList.remove('invisible');
            let item = this.allPerson[this.selectedElement.getAttribute('data-id')];
            blackout.querySelector('input[name="name"]').value = item.name;
            blackout.querySelector('input[name="family"]').value = item.family;
            blackout.querySelector('input[name="date"]').value = item.dateOfBirth;
            blackout.querySelector('select[name="position"]').value = item.position;
            blackout.querySelector('input[name="remote"]').checked = item.isRemote;
            blackout.querySelector('input[name="city"]').value = item.address.city; 
            blackout.querySelector('input[name="street"]').value = item.address.street; 
            blackout.querySelector('input[name="house"]').value = item.address.house; 
            blackout.querySelector('input[name="apart"]').value = item.address.apart;
            blackout.querySelector('input[name="mark"]').checked = item.isMark;
            
        };

    };

    class Person {
        constructor (personInfo, grid) {
            this.grid = grid;
            this.id = grid.counter;
            this.img = personInfo.img;
            this.name = personInfo.name;
            this.family = personInfo.family;
            this.dateOfBirth = personInfo.date;
            this.position = personInfo.position;
            this.isRemote = personInfo.remote;
            this.address = personInfo.address;
            this.isMark = personInfo.mark;  
            this.element = null;
            this.render();
        };
        render () {
            const table = document.querySelector('tbody');
            const tableRow = document.createElement('tr');
            tableRow.setAttribute('data-id', this.id)
            tableRow.innerHTML = `<td><img src="${this.img} " alt=""></td>
                                    <td class="bord">${this.name} </td>
                                    <td>${this.family} </td>
                                    <td>${this.setPoints ()} </td>
                                    <td>${this.setAge ()} </td>
                                    <td>${this.position} </td>
                                    <td><input type="checkbox" ${this.isRemote ? 'checked' : ''}></td>
                                    <td>${this.setAddress ()} </td>`; 
            table.insertAdjacentElement('beforeend', tableRow);
            this.element = tableRow;
            this.addEvent ()
            
            
        };
        addEvent () {
            this.element.addEventListener('click', e => {

                if (this.grid.selectedElement) {
                    this.grid.selectedElement.classList.remove('select');
                    if (this.grid.selectedElement == this.element) {
                        this.grid.selectedElement = null;
                        return;
                    };
                };
                if(this.grid.selectedElement != this.element) {
                    this.grid.selectedElement = this.element;
                    this.grid.selectedElement.classList.add('select');
                };
            });
        };
        setPoints () {
            return this.dateOfBirth.split('-').reverse().join('.');
        };
        setAge () {
            return new Date().getFullYear() - this.dateOfBirth.split('-')[0];
        };
        setAddress () {
            return `г.${this.address.city}, ${this.address.street}, ${this.address.house} кв.${this.address.apart}`
        };
    }

    const grid = new PersonGrid();
    document.querySelector('.photo__button').addEventListener('click', e => {
        console.log(document.querySelector('input[type="file"]').files[0].name);
        document.querySelector('.photo__img').src = `./images/${document.querySelector('input[type="file"]').files[0].name}` ;

    })
    

});